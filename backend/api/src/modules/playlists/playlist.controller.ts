import type { Request, Response } from 'express';
import { playlistService } from './playlist.service';
import { sendSuccess, sendCreated, sendNoContent } from '../../utils/response';
import { createPaginationMeta } from '../../utils/pagination';
import type { CreatePlaylistInput, UpdatePlaylistInput, ListPlaylistQuery } from './playlist.schema';

/**
 * Express Request with typed params, query, and body.
 * Generics: <Params, ResBody, ReqBody, Query>
 */
type ListRequest = Request<object, object, object, ListPlaylistQuery>;
type GetByIdRequest = Request<{ id: string }>;
type CreateRequest = Request<object, object, CreatePlaylistInput>;
type UpdateRequest = Request<{ id: string }, object, UpdatePlaylistInput>;
type DeleteRequest = Request<{ id: string }>;

/**
 * Playlist controller - handles HTTP request/response logic.
 * Receives validated data from middleware, calls service, formats response.
 * No business logic here - that belongs in the service layer.
 */
export const playlistController = {
	/**
	 * GET /api/v1/playlists
	 * List public playlists with pagination.
	 * Query params: page, limit, visibility (optional)
	 */
	async list(req: ListRequest, res: Response) {
		const { page, limit, visibility } = req.validated?.query as ListPlaylistQuery;

		const { playlists, total } = await playlistService.list(page, limit, visibility);
		const meta = createPaginationMeta(total, page, limit);

		sendSuccess(res, playlists, 200, meta);
	},

	/**
	 * GET /api/v1/playlists/:id
	 * Get a single playlist with all tracks.
	 * Returns 404 if not found.
	 */
	async getById(req: GetByIdRequest, res: Response) {
		const { id } = req.params;

		const playlist = await playlistService.getById(id);

		sendSuccess(res, playlist);
	},

	/**
	 * POST /api/v1/playlists
	 * Create a new playlist.
	 * Body: { name, description?, coverImage?, visibility?, isCollaborative? }
	 * Returns 201 with created playlist.
	 */
	async create(req: CreateRequest, res: Response) {
		const data = req.body as CreatePlaylistInput;

		const playlist = await playlistService.create(req.user!.id, data);

		sendCreated(res, playlist);
	},

	/**
	 * PATCH /api/v1/playlists/:id
	 * Update an existing playlist (partial update).
	 * Body: { name?, description?, coverImage?, visibility?, isCollaborative? }
	 * Returns 200 with updated playlist.
	 */
	async update(req: UpdateRequest, res: Response) {
		const { id } = req.params;
		const data = req.body as UpdatePlaylistInput;

		const playlist = await playlistService.update(id, data);

		sendSuccess(res, playlist);
	},

	/**
	 * DELETE /api/v1/playlists/:id
	 * Delete a playlist.
	 * Returns 204 No Content on success.
	 */
	async delete(req: DeleteRequest, res: Response) {
		const { id } = req.params;

		await playlistService.delete(id);

		sendNoContent(res);
	},
};
