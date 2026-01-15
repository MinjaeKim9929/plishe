import type { Request, Response } from 'express';
import { userService } from './user.service';
import { sendSuccess } from '../../utils/response';
import { createPaginationMeta } from '../../utils/pagination';
import type { UpdateUserInput, SearchUsersQuery, ListUsersQuery } from './user.schema';

// Request types
type ListRequest = Request<object, object, object, ListUsersQuery>;
type GetByIdRequest = Request<{ id: string }>;
type GetByUsernameRequest = Request<{ username: string }>;
type UpdateRequest = Request<{ id: string }, object, UpdateUserInput>;
type SearchRequest = Request<object, object, object, SearchUsersQuery>;
type UserPlaylistsRequest = Request<{ id: string }, object, object, ListUsersQuery>;

// Temporary mock user ID
const MOCK_USER_ID = '00000000-0000-0000-0000-000000000001';

export const userController = {
	/**
	 * GET /api/v1/users
	 * List users with pagination.
	 */
	async list(req: ListRequest, res: Response) {
		const { page = 1, limit = 20 } = req.query as unknown as ListUsersQuery;

		const { users, total } = await userService.list(page, limit);
		const meta = createPaginationMeta(total, page, limit);

		sendSuccess(res, users, 200, meta);
	},

	/**
	 * GET /api/v1/users/search
	 * Search users by username or display name.
	 */
	async search(req: SearchRequest, res: Response) {
		const { q, page = 1, limit = 20 } = req.query as unknown as SearchUsersQuery;

		const { users, total } = await userService.search(q, page, limit);
		const meta = createPaginationMeta(total, page, limit);

		sendSuccess(res, users, 200, meta);
	},

	/**
	 * GET /api/v1/users/:id
	 * Get user by ID.
	 */
	async getById(req: GetByIdRequest, res: Response) {
		const { id } = req.params;

		const user = await userService.getById(id);

		sendSuccess(res, user);
	},

	/**
	 * GET /api/v1/users/username/:username
	 * Get user by username.
	 */
	async getByUsername(req: GetByUsernameRequest, res: Response) {
		const { username } = req.params;

		const user = await userService.getByUsername(username);

		sendSuccess(res, user);
	},

	/**
	 * PATCH /api/v1/users/:id
	 * Update user profile.
	 * TODO: Add auth check - only allow updating own profile
	 */
	async update(req: UpdateRequest, res: Response) {
		const { id } = req.params;
		const data = req.body as UpdateUserInput;

		// TODO: Verify req.user.id === id when auth is implemented

		const user = await userService.update(id, data);

		sendSuccess(res, user);
	},

	/**
	 * GET /api/v1/users/:id/playlists
	 * Get user's playlists.
	 */
	async getUserPlaylists(req: UserPlaylistsRequest, res: Response) {
		const { id } = req.params;
		const { page = 1, limit = 20 } = req.query as unknown as ListUsersQuery;

		// TODO: Pass actual requester ID when auth is implemented
		const { playlists, total } = await userService.getUserPlaylists(id, page, limit, MOCK_USER_ID);
		const meta = createPaginationMeta(total, page, limit);

		sendSuccess(res, playlists, 200, meta);
	},

	/**
	 * GET /api/v1/users/me
	 * Get current authenticated user's profile.
	 * TODO: Implement when auth is ready
	 */
	async getMe(_req: Request, res: Response) {
		// TODO: Get user from req.user when auth is implemented
		const user = await userService.getById(MOCK_USER_ID);

		sendSuccess(res, user);
	},
};
