import { Router } from 'express';
import { playlistController } from './playlist.controller';
import { asyncHandler } from '../../middleware/async-handler';
import { validate } from '../../middleware/validate';
import { createPlaylistSchema, updatePlaylistSchema, playlistIdSchema, listPlaylistsSchema } from './playlist.schema';
import { optionalAuth, requireAuth } from '../../middleware/auth';

/**
 * Express Router for playlist endpoints.
 * All routes are prefixed with /api/v1/playlists (set in route aggregation).
 */
const router = Router();

/**
 * GET /
 * List public playlists with pagination.
 * Query: { page?: number, limit?: number, visibility?: string }
 * Validates query params with listPlaylistsSchema.
 */
router.get(
	'/', //
	optionalAuth,
	validate({ query: listPlaylistsSchema }),
	asyncHandler(playlistController.list),
);

/**
 * GET /:id
 * Get a single playlist by ID with all tracks.
 * Params: { id: UUID }
 * Returns 404 if playlist not found.
 */
router.get(
	'/:id', //
	validate({ params: playlistIdSchema }),
	asyncHandler(playlistController.getById),
);

/**
 * POST /
 * Create a new playlist.
 * Body: { name: string, description?: string, coverImage?: string, visibility?: enum, isCollaborative?: boolean }
 * Returns 201 with created playlist.
 */
router.post(
	'/', //
	requireAuth,
	validate({ body: createPlaylistSchema }),
	asyncHandler(playlistController.create),
);

/**
 * PATCH /:id
 * Update an existing  playlist (partial update).
 * Params: { id: UUID }
 * Body: Any subset of { name, description, coverImage, visibility, isCollaborative }
 * Returns 200 with updated playlist.
 */
router.patch(
	'/:id', //
	requireAuth,
	validate({ params: playlistIdSchema, body: updatePlaylistSchema }),
	asyncHandler(playlistController.update),
);

/**
 * DELETE /:id
 * Delete a playlist and all its track associations.
 * Params: { id: UUID }
 * Returns 204 No Content on success.
 */
router.delete(
	'/:id', //
	requireAuth,
	validate({ params: playlistIdSchema }),
	asyncHandler(playlistController.delete),
);

export default router;
