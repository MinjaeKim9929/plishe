import type { Request, Response } from 'express';
import { authService } from './auth.service';
import { sendSuccess, sendCreated } from '../../utils/response';
import type { RegisterInput, LoginInput, RefreshTokenInput } from './auth.schema';

// Request types
type RegisterRequest = Request<object, object, RegisterInput>;
type LoginRequest = Request<object, object, LoginInput>;
type RefreshRequest = Request<object, object, RefreshTokenInput>;

export const authController = {
	/**
	 * POST /api/v1/auth/register
	 * Register new user with email/password.
	 */
	async register(req: RegisterRequest, res: Response) {
		const user = await authService.register(req.body);
		sendCreated(res, user);
	},

	/**
	 * POST /api/v1/auth/login
	 * Login with email/password.
	 */
	async login(req: LoginRequest, res: Response) {
		const result = await authService.login(req.body);
		sendSuccess(res, result);
	},

	/**
	 * POST /api/v1/auth/refresh
	 * Refresh access token.
	 */
	async refreshToken(req: RefreshRequest, res: Response) {
		const tokens = await authService.refreshToken(req.body);
		sendSuccess(res, tokens);
	},

	/**
	 * GET /api/v1/auth/me
	 * Get current authenticated user.
	 */
	async getMe(req: Request, res: Response) {
		const user = await authService.getMe(req.user!.id);
		sendSuccess(res, user);
	},

	/**
	 * POST /api/v1/auth/logout
	 * Logout current user.
	 */
	async logout(_req: Request, res: Response) {
		// Supabase handles token invalidation on client side
		// Server just returns success
		sendSuccess(res, { message: 'Logged out successfully' });
	},
};
