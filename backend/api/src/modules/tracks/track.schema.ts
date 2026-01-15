import { z } from 'zod';

// Create track
export const createTrackSchema = z.object({
	isrc: z.string().max(12).optional(),
	title: z.string().min(1).max(255),
	artist: z.string().min(1).max(255),
	album: z.string().max(255).optional(),
	duration: z.number().int().positive(), // ms
	coverUrl: z.url().optional(),
	spotifyId: z.string().max(50).optional(),
	appleMusicId: z.string().max(50).optional(),
	youtubeMusicId: z.string().max(50).optional(),
});

// Update track
export const updateTrackSchema = z.object({
	isrc: z.string().max(12).nullable().optional(),
	title: z.string().min(1).max(255).optional(),
	artist: z.string().min(1).max(255).optional(),
	album: z.string().max(255).nullable().optional(),
	duration: z.number().int().positive().optional(),
	coverUrl: z.url().nullable().optional(),
	spotifyId: z.string().max(50).nullable().optional(),
	appleMusicId: z.string().max(50).nullable().optional(),
	youtubeMusicId: z.string().max(50).nullable().optional(),
});

// Track ID param
export const trackIdSchema = z.object({
	id: z.uuid(),
});

// Playlist ID param
export const playlistIdSchema = z.object({
	trackId: z.uuid(),
	position: z.number().int().min(0).optional,
});

// Add track to playlist
export const addTrackToPlaylistSchema = z.object({
	trackId: z.uuid(),
	position: z.number().int().min(0).optional(),
});

// Remove track from playlist
export const removeTrackFromPlaylistSchema = z.object({
	trackId: z.uuid(),
});

// Reorder tracks in playlist
export const reorderTracksSchema = z.object({
	trackId: z.uuid(),
	newPosition: z.number().int().min(0),
});

// Search tracks query
export const searchTracksSchema = z.object({
	q: z.string().min(1).max(100), // search query
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(50).default(20),
});

// List tracks query (pagination)
export const listTracksSchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
});

// Type exports
export type CreateTrackInput = z.infer<typeof createTrackSchema>;
export type UpdateTrackInput = z.infer<typeof updateTrackSchema>;
export type AddTrackToPlaylistInput = z.infer<typeof addTrackToPlaylistSchema>;
export type ReorderTracksInput = z.infer<typeof reorderTracksSchema>;
export type SearchTracksQuery = z.infer<typeof searchTracksSchema>;
export type ListTracksQuery = z.infer<typeof listTracksSchema>;
