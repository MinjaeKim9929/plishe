import { prisma } from '../../lib/prisma';
import { NotFoundError, ConflictError } from '../../lib/errors';
import type { CreateTrackInput, UpdateTrackInput, AddTrackToPlaylistInput, ReorderTracksInput } from './track.schema';

// Temporary mock user ID
const MOCK_USER_ID = '00000000-0000-0000-0000-000000000001';

export const trackService = {
	/**
	 * List all tracks with pagination.
	 */
	async list(page = 1, limit = 20) {
		const skip = (page - 1) * limit;

		const [tracks, total] = await Promise.all([
			prisma.track.findMany({
				skip,
				take: limit,
				orderBy: { createdAt: 'desc' },
			}),
			prisma.track.count(),
		]);

		return { tracks, total };
	},

	/**
	 * Get a single track by ID.
	 */
	async getById(id: string) {
		const track = await prisma.track.findUnique({
			where: { id },
		});

		if (!track) {
			throw new NotFoundError('Track');
		}

		return track;
	},

	/**
	 * Search tracks by title or artist/
	 * Uses case-insensitive contains search.
	 */
	async search(query: string, page = 1, limit = 20) {
		const skip = (page - 1) * limit;

		const where = {
			OR: [
				{ title: { contains: query, mode: 'insensitive' as const } }, //
				{ artist: { contains: query, mode: 'insensitive' as const } },
				{ album: { contains: query, mode: 'insensitive' as const } },
			],
		};

		const [tracks, total] = await Promise.all([
			prisma.track.findMany({
				where,
				skip,
				take: limit,
				orderBy: { title: 'asc' },
			}),
			prisma.track.count({ where }),
		]);

		return { tracks, total };
	},

	/**
	 * Create a new track.
	 * Checks for duplicate ISRC if provided.
	 */
	async create(data: CreateTrackInput) {
		// Check for duplicate ISRC
		if (data.isrc) {
			const existing = await prisma.track.findUnique({
				where: { isrc: data.isrc },
			});
			if (existing) {
				throw new ConflictError('Track with this ISRC already exists');
			}
		}

		return prisma.track.create({ data });
	},

	/**
	 * Update an existing track.
	 */
	async update(id: string, data: UpdateTrackInput) {
		const existing = await prisma.track.findUnique({ where: { id } });

		if (!existing) {
			throw new NotFoundError('Track');
		}

		return prisma.track.update({
			where: { id },
			data,
		});
	},

	/**
	 * Delete a track.
	 * Note: This will cascade delete all PlaylistTrack associations.
	 */
	async delete(id: string) {
		const existing = await prisma.track.findUnique({ where: { id } });

		if (!existing) {
			throw new NotFoundError('Track');
		}

		await prisma.track.delete({ where: { id } });
	},

	/**
	 * Add a track to a playlist.
	 * If position is not specified, appends to end.
	 */
	async addToPlaylist(playlistId: string, data: AddTrackToPlaylistInput) {
		// Verify playlist exists
		const playlist = await prisma.playlist.findUnique({ where: { id: playlistId } });
		if (!playlist) {
			throw new NotFoundError('Playlist');
		}

		// Verify track exists
		const track = await prisma.track.findUnique({ where: { id: data.trackId } });
		if (!track) {
			throw new NotFoundError('Track');
		}

		// Check if track already in playlist
		const existing = await prisma.playlistTrack.findUnique({
			where: { playlistId_trackId: { playlistId, trackId: data.trackId } },
		});
		if (existing) {
			throw new ConflictError('Track already in playlist');
		}

		// Get position
		let position = data.position;
		if (position === undefined) {
			const lastTrack = await prisma.playlistTrack.findFirst({
				where: { playlistId },
				orderBy: { position: 'desc' },
			});
			position = lastTrack ? lastTrack.position + 1 : 0;
		} else {
			// Shift existing tracks if inserting at specific position
			await prisma.playlistTrack.updateMany({
				where: { playlistId, position: { gte: position } },
				data: { position: { increment: 1 } },
			});
		}

		// Create playlist-track association
		const playlistTrack = await prisma.playlistTrack.create({
			data: {
				playlistId,
				trackId: data.trackId,
				position,
				addedById: MOCK_USER_ID,
			},
			include: { track: true },
		});

		// Update playlist track count
		await prisma.playlist.update({
			where: { id: playlistId },
			data: { trackCount: { increment: 1 } },
		});

		return playlistTrack;
	},

	/**
	 * Remove a track from a playlist.
	 * Reorders remaining tracks to fill the gap.
	 */
	async removeFromPlaylist(playlistId: string, trackId: string) {
		// Find the playlist-track association
		const playlistTrack = await prisma.playlistTrack.findUnique({
			where: { playlistId_trackId: { playlistId, trackId } },
		});

		if (!playlistTrack) {
			throw new NotFoundError('Track not found in playlist');
		}

		// Delete the association
		await prisma.playlistTrack.delete({
			where: { id: playlistTrack.id },
		});

		// Shift positions of tracks after the removed one
		await prisma.playlistTrack.updateMany({
			where: { playlistId, position: { gt: playlistTrack.position } },
			data: { position: { decrement: 1 } },
		});

		// Update playlist track count
		await prisma.playlist.update({
			where: { id: playlistId },
			data: { trackCount: { decrement: 1 } },
		});
	},

	/**
	 * Reorder a track within a playlist.
	 * Moves track from current position to new position.
	 */
	async reorderInPlaylist(playlistId: string, data: ReorderTracksInput) {
		const { trackId, newPosition } = data;

		// Find current position
		const playlistTrack = await prisma.playlistTrack.findUnique({
			where: { playlistId_trackId: { playlistId, trackId } },
		});

		if (!playlistTrack) {
			throw new NotFoundError('Track not found in playlist');
		}

		const oldPosition = playlistTrack.position;

		if (oldPosition === newPosition) {
			return playlistTrack; // No change needed
		}

		// Use a transaction to reorder
		await prisma.$transaction(async (tx) => {
			// Temporarily move track out of the way
			await tx.playlistTrack.update({
				where: { id: playlistTrack.id },
				data: { position: -1 },
			});

			if (newPosition > oldPosition) {
				// Moving down: shift tracks between old and new position up
				await tx.playlistTrack.updateMany({
					where: {
						playlistId,
						position: { gt: oldPosition, lte: newPosition },
					},
					data: { position: { decrement: 1 } },
				});
			} else {
				await tx.playlistTrack.updateMany({
					where: {
						playlistId,
						position: { gt: newPosition, lt: oldPosition },
					},
					data: { position: { increment: 1 } },
				});
			}

			// Move track to new position
			await tx.playlistTrack.update({
				where: { id: playlistTrack.id },
				data: { position: newPosition },
			});
		});

		return prisma.playlistTrack.findUnique({
			where: { id: playlistTrack.id },
			include: { track: true },
		});
	},

	/**
	 * Get all tracks in a playlist (ordered by position).
	 */
	async getPlaylistTracks(playlistId: string, page = 1, limit = 50) {
		const playlist = await prisma.playlist.findUnique({ where: { id: playlistId } });
		if (!playlist) {
			throw new NotFoundError('Playlist');
		}

		const skip = (page - 1) * limit;

		const [playlistTracks, total] = await Promise.all([
			prisma.playlistTrack.findMany({
				where: { playlistId },
				skip,
				take: limit,
				orderBy: { position: 'asc' },
				include: {
					track: true,
					addedBy: {
						select: { id: true, username: true, displayName: true },
					},
				},
			}),
			prisma.playlistTrack.count({ where: { playlistId } }),
		]);

		return { tracks: playlistTracks, total };
	},
};
