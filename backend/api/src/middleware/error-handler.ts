import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { success, ZodError } from 'zod';
import { AppError, ValidationError } from '../lib/errors';

/**
 * Global error handler middleware
 * Must be registered LAST in Express middleware chain.
 *
 * Handles:
 * - ZodError -> 400 with field-level errors
 * - ValidationError -> 400 with custom errors
 * - AppError -> Custom status code
 * - Unknown errors -> 500
 */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	// Log error for debugging
	console.error('[error]', err);

	// Zod validation errors (from validate middleware)
	if (err instanceof ZodError) {
		const errors: Record<string, string[]> = {};
		err.issues.forEach((issue) => {
			const path = issue.path.join('.');
			if (!errors[path]) errors[path] = [];
			errors[path].push(issue.message);
		});

		res.status(StatusCodes.BAD_REQUEST).json({
			success: false,
			error: {
				code: 'VALIDATION_ERROR',
				message: 'Invalid request data',
				errors,
			},
		});
		return;
	}

	// Custom validation errors
	if (err instanceof ValidationError) {
		res.status(err.statusCode).json({
			success: false,
			error: {
				code: err.code,
				message: err.message,
				errors: err.errors,
			},
		});
		return;
	}

	// Known application errors (NotFoundError, ConflictError, etc.)
	if (err instanceof AppError) {
		res.status(err.statusCode).json({
			success: false,
			error: {
				code: err.code,
				message: err.message,
			},
		});
		return;
	}

	// Unknown/unexpected errors
	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		success: false,
		error: {
			code: 'INTERNAL_ERROR',
			message: 'An unexpected error occurred',
		},
	});
};
