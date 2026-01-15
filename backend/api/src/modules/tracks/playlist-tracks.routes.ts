import { Router } from 'express';
import { trackController } from './track.controller';
import { asyncHandler } from '../../middleware/async-handler';
import { validate } from '../../middleware/validate';
import {
	playlistIdSchema,
	addTrackToPlaylistSchema,
	removeTrackFromPlaylistSchema,
	reorderTracksSchema,
	listTracksSchema,
} from './track.schema';

// mergeParams: true allows access to :playlistId from parent router
const router = Router({ mergeParams: true });

/**
 * GET /playlists/:playlistId/tracks
 * Get all tracks in a playlist.
 */
router.get(
	'/', //
	validate({ params: playlistIdSchema, query: listTracksSchema }),
	asyncHandler(trackController.getPlaylistTracks)
);

/**
 * POST /playlists/:playlistId/tracks
 * Add a track to a playlist.
 */
router.post(
	'/',
	validate({ params: playlistIdSchema, body: addTrackToPlaylistSchema }),
	asyncHandler(trackController.addToPlaylist)
);

/**
 * DELETE /playlists/:playlistId/tracks/:trackId
 * Remove a track from a playlist.
 */
router.delete(
	'/:trackId', //
	validate({ params: removeTrackFromPlaylistSchema }),
	asyncHandler(trackController.removeFromPlaylist)
);

/**
 * PATCH /playlists/:playlistId/tracks/reorder
 * Reorder a track within a playlist.
 */
router.patch(
	'/reorder', //
	validate({ params: playlistIdSchema, body: reorderTracksSchema }),
	asyncHandler(trackController.reorderInPlaylist)
);

export default router;
