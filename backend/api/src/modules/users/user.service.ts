import { prisma } from '../../lib/prisma';
import { NotFoundError, ConflictError } from '../../lib/errors';
import type { UpdateUserInput } from './user.schema';
import { PlaylistVisibility } from '../../generated/prisma';
import { iso } from 'zod';

export const userService = {
	/**
	 * List users with pagination.
	 */
	async list(page = 1, limit = 20) {
		const skip = (page - 1) * limit;

		const [users, total] = await Promise.all([
			prisma.user.findMany({
				skip,
				take: limit,
				orderBy: { createdAt: 'desc' },
				select: {
					id: true, //
					username: true,
					displayName: true,
					bio: true,
					profileImage: true,
					createdAt: true,
				},
			}),
			prisma.user.count(),
		]);

		return { users, total };
	},

	/**
	 * Get user by ID.
	 * Includes public stats (playlist count)
	 */
	async getById(id: string) {
		const user = await prisma.user.findUnique({
			where: { id },
			select: {
				id: true, //
				username: true,
				displayName: true,
				bio: true,
				profileImage: true,
				createdAt: true,
				_count: {
					select: {
						playlists: {
							where: { visibility: PlaylistVisibility.PUBLIC },
						},
					},
				},
			},
		});

		if (!user) {
			throw new NotFoundError('User');
		}

		return {
			...user,
			playlistCount: user._count.playlists,
			_count: undefined,
		};
	},

	/**
	 * Get user by username.
	 */
	async getByUsername(username: string) {
		const user = await prisma.user.findUnique({
			where: { username },
			select: {
				id: true, //
				username: true,
				displayName: true,
				bio: true,
				profileImage: true,
				createdAt: true,
				_count: {
					select: {
						playlists: {
							where: {
								visibility: PlaylistVisibility.PUBLIC,
							},
						},
					},
				},
			},
		});

		if (!user) {
			throw new NotFoundError('User');
		}

		return {
			...user,
			playlistCount: user._count.playlists,
			_count: undefined,
		};
	},

	/**
	 * Search users by username or display name.
	 */
	async search(query: string, page = 1, limit = 20) {
		const skip = (page - 1) * limit;

		const where = {
			OR: [
				{ username: { contains: query, mode: 'insensitive' as const } },
				{ displayName: { contains: query, mode: 'insensitive' as const } },
			],
		};

		const [users, total] = await Promise.all([
			prisma.user.findMany({
				where,
				skip,
				take: limit,
				orderBy: { username: 'asc' },
				select: {
					id: true,
					username: true,
					displayName: true,
					profileImage: true,
				},
			}),
			prisma.user.count({ where }),
		]);

		return { users, total };
	},

	/**
	 * Update user profile.
	 */
	async update(id: string, data: UpdateUserInput) {
		const existing = await prisma.user.findUnique({ where: { id } });

		if (!existing) {
			throw new NotFoundError('User');
		}

		return prisma.user.update({
			where: { id },
			data,
			select: {
				id: true,
				username: true,
				displayName: true,
				bio: true,
				profileImage: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	},

	/**
	 * Get user's playlists.
	 * Shows all playlists for own profile, only public for others.
	 */
	async getUserPlaylists(
		userId: string, //
		page = 1,
		limit = 20,
		requesterId?: string
	) {
		// Check if user exists
		const user = await prisma.user.findUnique({ where: { id: userId } });
		if (!user) {
			throw new NotFoundError('User');
		}

		const skip = (page - 1) * limit;

		// If viewing own profile, show all playlists
		// Otherwise, show only public playlists
		const isOwnProfile = requesterId === userId;
		const where = {
			userId,
			...(isOwnProfile ? {} : { visibility: PlaylistVisibility.PUBLIC }),
		};

		const [playlists, total] = await Promise.all([
			prisma.playlist.findMany({
				where,
				skip,
				take: limit,
				orderBy: { createdAt: 'desc' },
				select: {
					id: true,
					name: true,
					description: true,
					coverImage: true,
					visibility: true,
					trackCount: true,
					createdAt: true,
				},
			}),
			prisma.playlist.count({ where }),
		]);

		return { playlists, total };
	},

	/**
	 * Check if username is available.
	 */
	async isUsernameAvailable(username: string): Promise<boolean> {
		const existing = await prisma.user.findUnique({
			where: { username },
			select: { id: true },
		});
		return !existing;
	},
};
