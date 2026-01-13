import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { success } from 'zod';

/**
 * 404 handler for unknown routes.
 * Must be registered AFTER all routes, BEFORE error handler.
 *
 * Example:
 *    GET /api/v1/unknown -> { success: false, error: { code: 'NOT_FOUND', ... } }
 */
export const notFoundHandler: RequestHandler = (_req, res) => {
	res.status(StatusCodes.NOT_FOUND).json({
		success: false,
		error: {
			code: 'NOT_FOUND',
			message: 'The requested resource was not found',
		},
	});
};
