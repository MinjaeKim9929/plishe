import { Router } from 'express';
import { trackController } from './track.controller';
import { asyncHandler } from '../../middleware/async-handler';
import { validate } from '../../middleware/validate';
import {
	createTrackSchema,
	updateTrackSchema,
	trackIdSchema,
	listTracksSchema,
	searchTracksSchema,
	playlistIdSchema,
	addTrackToPlaylistSchema,
	removeTrackFromPlaylistSchema,
	reorderTracksSchema,
} from './track.schema';

const router = Router();

/**
 * GET /tracks
 * List all tracks with pagination.
 */
router.get(
	'/', //
	validate({ query: listTracksSchema }),
	asyncHandler(trackController.list)
);

/**
 * GET /tracks/search
 * Search tracks by title/artist/album.
 * Query: { q: string, page?: number, limit?: number }
 */
router.get(
	'/search', //
	validate({ query: searchTracksSchema }),
	asyncHandler(trackController.search)
);

/**
 * GET /tracks/:id
 * Get a single track by ID.
 */
router.get(
	'/:id', //
	validate({ params: trackIdSchema }),
	asyncHandler(trackController.getById)
);

/**
 * POST /tracks
 * Create a new track.
 */
router.post(
	'/', //
	validate({ body: createTrackSchema }),
	asyncHandler(trackController.create)
);

/**
 * PATCH /tracks/:id
 * Update a track.
 */
router.patch(
	'/:id', //
	validate({ params: trackIdSchema, body: updateTrackSchema }),
	asyncHandler(trackController.update)
);

/**
 * DELETE /tracks/:id
 * Delete a track.
 */
router.delete(
	'/:id', //
	validate({ params: trackIdSchema }),
	asyncHandler(trackController.delete)
);

export default router;
