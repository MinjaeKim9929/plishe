import { Router } from 'express';
import { userController } from './user.controller';
import { asyncHandler } from '../../middleware/async-handler';
import { validate } from '../../middleware/validate';
import { userIdSchema, usernameSchema, updateUserSchema, listUsersSchema, searchUsersSchema } from './user.schema';

const router = Router();

/**
 * GET /users
 * List users with pagination.
 */
router.get(
	'/', //
	validate({ query: listUsersSchema }),
	asyncHandler(userController.list)
);

/**
 * GET /users/search
 * Search users by username/display name.
 */
router.get(
	'/search', //
	validate({ query: searchUsersSchema }),
	asyncHandler(userController.search)
);

/**
 * GET /users/me
 * Get current authenticated user.
 */
router.get(
	'/me', //
	asyncHandler(userController.getMe)
);

/**
 * GET /users/username/:username
 * Get user by username.
 */
router.get(
	'/username/:username', //
	validate({ params: usernameSchema }),
	asyncHandler(userController.getByUsername)
);

/**
 * GET /users/:id
 * Get user by ID.
 */
router.get(
	'/:id', //
	validate({ params: userIdSchema }),
	asyncHandler(userController.getById)
);

/**
 * PATCH /users/:id
 * Update user profile.
 */
router.patch(
	'/:id', //
	validate({ params: userIdSchema, body: updateUserSchema }),
	asyncHandler(userController.update)
);

/**
 * GET /users/:id/playlists
 * Get user's playlists.
 */
router.get(
	'/:id/playlists',
	validate({ params: userIdSchema, query: listUsersSchema }),
	asyncHandler(userController.getUserPlaylists)
);

export default router;
