import { prisma } from '../../lib/prisma';
import { NotFoundError } from '../../lib/errors';
import type { CreatePlaylistInput, UpdatePlaylistInput } from './playlist.schema';
import { PlaylistVisibility } from '../../generated/prisma/enums';

// Temporary mock user ID
const MOCK_USER_ID = '00000000-0000-0000-0000-000000000001';

/**
 * Playlist service - handles all playlist-related business logic.
 * Acts as a layer between controllers and database (Prisma).
 */
export const playlistService = {
	/**
	 * List playlists with pagination.
	 * Defaults to PUBLIC playlists only for discovery feed
	 * Includes basic user info (owner) for each playlist.
	 */
	async list(page: number, limit: number, visibility?: PlaylistVisibility) {
		const where = { visibility: visibility ?? PlaylistVisibility.PUBLIC };

		// Run count and fetch in parallel for better performance
		const [playlists, total] = await Promise.all([
			prisma.playlist.findMany({
				where,
				skip: (page - 1) * limit,
				take: limit,
				orderBy: { createdAt: 'desc' },
				include: {
					user: {
						select: { id: true, username: true, displayName: true, profileImage: true },
					},
				},
			}),
			prisma.playlist.count({ where }),
		]);
		return { playlists, total };
	},

	/**
	 * Get a single playlist by ID.
	 * Includes full track list with positions and user info.
	 * Throws NotFoundError if playlist doesn't exist.
	 */
	async getById(id: string) {
		const playlist = await prisma.playlist.findUnique({
			where: { id },
			include: {
				user: {
					select: { id: true, username: true, displayName: true, profileImage: true },
				},
				tracks: {
					orderBy: { position: 'asc' },
					include: { track: true },
				},
			},
		});

		if (!playlist) {
			throw new NotFoundError('Playlist');
		}

		return playlist;
	},

	/**
	 * Create a new playlist.
	 * Assigns the mock user ID as owner (until auth is implemented).
	 */
	async create(data: CreatePlaylistInput) {
		return prisma.playlist.create({
			data: {
				...data,
				userId: MOCK_USER_ID,
			},
		});
	},

	/**
	 * Update an existing playlist.
	 * Only updates fields provided in the data object.
	 * Throws NotFoundError if playlist doesn't exist.
	 */
	async update(id: string, data: UpdatePlaylistInput) {
		const existing = await prisma.playlist.findUnique({ where: { id } });

		if (!existing) {
			throw new NotFoundError('Playlist');
		}

		return prisma.playlist.update({
			where: { id },
			data,
		});
	},

	/**
	 * Delete a playlist by ID.
	 * Cascades to delete all PlaylistTrack records (defined in Prisma schema).
	 * Throw NotFoundError if playlist doesn't exist.
	 */
	async delete(id: string) {
		const existing = await prisma.playlist.findUnique({ where: { id } });

		if (!existing) {
			throw new NotFoundError('Playlist');
		}

		await prisma.playlist.delete({ where: { id } });
	},
};
