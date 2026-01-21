import { Router } from 'express';
import { authController } from './auth.controller';
import { validate } from '../../middleware/validate';
import { asyncHandler } from '../../middleware/async-handler';
import { requireAuth } from '../../middleware/auth';
import { registerSchema, loginSchema, refreshTokenSchema } from './auth.schema';

const router = Router();

/**
 * POST /auth/register
 * Register new user with email/password.
 */
router.post(
	'/register',
	validate({ body: registerSchema }),
	asyncHandler(authController.register)
);

/**
 * POST /auth/login
 * Login with email/password.
 */
router.post(
	'/login',
	validate({ body: loginSchema }),
	asyncHandler(authController.login)
);

/**
 * POST /auth/refresh
 * Refresh access token.
 */
router.post(
	'/refresh',
	validate({ body: refreshTokenSchema }),
	asyncHandler(authController.refreshToken)
);

/**
 * GET /auth/me
 * Get current authenticated user.
 */
router.get(
	'/me',
	requireAuth,
	asyncHandler(authController.getMe)
);

/**
 * POST /auth/logout
 * Logout current user.
 */
router.post(
	'/logout',
	requireAuth,
	asyncHandler(authController.logout)
);

export default router;
