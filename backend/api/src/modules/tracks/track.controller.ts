import type { Request, Response } from 'express';
import { trackService } from './track.service';
import { sendSuccess, sendCreated, sendNoContent } from '../../utils/response';
import { createPaginationMeta } from '../../utils/pagination';
import type {
	CreateTrackInput,
	UpdateTrackInput,
	AddTrackToPlaylistInput,
	ReorderTracksInput,
	SearchTracksQuery,
	ListTracksQuery,
} from './track.schema';

// Request types
type ListRequest = Request<object, object, object, ListTracksQuery>;
type GetByIdRequest = Request<{ id: string }>;
type CreateRequest = Request<object, object, CreateTrackInput>;
type UpdateRequest = Request<{ id: string }, object, UpdateTrackInput>;
type DeleteRequest = Request<{ id: string }>;
type SearchRequest = Request<object, object, object, SearchTracksQuery>;

// Playlist-track operations
type PlaylistTracksRequest = Request<{ playlistId: string }, object, object, ListTracksQuery>;
type AddToPlaylistRequest = Request<{ playlistId: string }, object, AddTrackToPlaylistInput>;
type RemoveFromPlaylistRequest = Request<{ playlistId: string; trackId: string }>;
type ReorderRequest = Request<{ playlistId: string }, object, ReorderTracksInput>;

export const trackController = {
	/**
	 * GET /api/v1/tracks
	 * List all tracks with pagination.
	 */
	async list(req: ListRequest, res: Response) {
		const { page = 1, limit = 20 } = req.query as unknown as ListTracksQuery;

		const { tracks, total } = await trackService.list(page, limit);
		const meta = createPaginationMeta(total, page, limit);

		sendSuccess(res, tracks, 200, meta);
	},

	/**
	 * GET /api/v1/tracks/search
	 * Search tracks by title/artist
	 */
	async search(req: SearchRequest, res: Response) {
		const { q, page = 1, limit = 20 } = req.query as unknown as SearchTracksQuery;

		const { tracks, total } = await trackService.search(q, page, limit);
		const meta = createPaginationMeta(total, page, limit);

		sendSuccess(res, tracks, 200, meta);
	},

	/**
	 * GET /api/v1/tracks/:id
	 * Get a single track by ID.
	 */
	async getById(req: GetByIdRequest, res: Response) {
		const { id } = req.params;

		const track = await trackService.getById(id);

		sendSuccess(res, track);
	},

	/**
	 * POST /api/v1/tracks
	 * Create a new track.
	 */
	async create(req: CreateRequest, res: Response) {
		const data = req.body as CreateTrackInput;

		const track = await trackService.create(data);

		sendCreated(res, track);
	},

	/**
	 * PATCH /api/v1/tracks/:id
	 * Update a track.
	 */
	async update(req: UpdateRequest, res: Response) {
		const { id } = req.params;
		const data = req.body as UpdateTrackInput;

		const track = await trackService.update(id, data);

		sendSuccess(res, track);
	},

	/**
	 * DELETE /api/v1/tracks/:id
	 * Delete a track.
	 */
	async delete(req: DeleteRequest, res: Response) {
		const { id } = req.params;

		await trackService.delete(id);

		sendNoContent(res);
	},

	/**
	 * GET /api/v1/playlists/:playlistId/tracks
	 * Get all tracks in a playlist.
	 */
	async getPlaylistTracks(req: PlaylistTracksRequest, res: Response) {
		const { playlistId } = req.params;
		const { page = 1, limit = 50 } = req.query as unknown as ListTracksQuery;

		const { tracks, total } = await trackService.getPlaylistTracks(playlistId, page, limit);
		const meta = createPaginationMeta(total, page, limit);

		sendSuccess(res, tracks, 200, meta);
	},

	/**
	 * POST /api/v1/playlists/:playlistId/tracks
	 * Ad a track to a playlist.
	 */
	async addToPlaylist(req: AddToPlaylistRequest, res: Response) {
		const { playlistId } = req.params;
		const data = req.body as AddTrackToPlaylistInput;

		const playlistTrack = await trackService.addToPlaylist(playlistId, req.user!.id, data);

		sendCreated(res, playlistTrack);
	},

	/**
	 * DELETE /api/v1/playlists/:playlistId/tracks/:trackId
	 * Remove a track from a playlist.
	 */
	async removeFromPlaylist(req: RemoveFromPlaylistRequest, res: Response) {
		const { playlistId, trackId } = req.params;

		await trackService.removeFromPlaylist(playlistId, trackId);

		sendNoContent(res);
	},

	/**
	 * PATCH /api/v1/playlists/:playlistId/tracks/reorder
	 * Reorder a track within a playlist.
	 */
	async reorderInPlaylist(req: ReorderRequest, res: Response) {
		const { playlistId } = req.params;
		const data = req.body as ReorderTracksInput;

		const result = await trackService.reorderInPlaylist(playlistId, data);

		sendSuccess(res, result);
	},
};
