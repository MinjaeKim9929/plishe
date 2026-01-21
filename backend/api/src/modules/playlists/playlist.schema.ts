import { z } from 'zod';

// Create playlist
export const createPlaylistSchema = z.object({
	name: z.string().min(1).max(100),
	description: z.string().max(500).optional(),
	coverImage: z.url().optional(),
	visibility: z.enum(['PUBLIC', 'PRIVATE', 'FOLLOWERS']).default('PUBLIC'),
	isCollaborative: z.boolean().default(false),
});

// Update playlist
export const updatePlaylistSchema = z.object({
	name: z.string().min(1).max(100).optional(),
	description: z.string().max(500).optional(),
	coverImage: z.url().nullable().optional(),
	visibility: z.enum(['PUBLIC', 'PRIVATE', 'FOLLOWERS']).optional(),
	isCollaborative: z.boolean().optional(),
});

// Params
export const playlistIdSchema = z.object({
	id: z.uuid(),
});

// Query for list
export const listPlaylistsSchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
	visibility: z.enum(['PUBLIC', 'PRIVATE', 'FOLLOWERS']).optional(),
	variant: z.enum(['CLASSIC', 'MODERN', 'VINTAGE']).default('MODERN'),
});

export type CreatePlaylistInput = z.infer<typeof createPlaylistSchema>;
export type UpdatePlaylistInput = z.infer<typeof updatePlaylistSchema>;
export type ListPlaylistQuery = z.infer<typeof listPlaylistsSchema>;
