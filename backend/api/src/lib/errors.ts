import { StatusCodes } from 'http-status-codes';

/**
 * Base error class for all application errors.
 * Extends native Error with HTTP status code and error code.
 */
export class AppError extends Error {
	constructor(
		public message: string,
		public statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
		public code: string = 'INTERNAL_ERROR'
	) {
		super(message);
		Object.setPrototypeOf(this, AppError.prototype);
	}
}

/**
 * 404 Not Found - Resource doesn't exist
 * Usage: throw new NotFoundError('Playlist')
 * Response: { code: 'NOT_FOUND', message: 'Playlist not found' }
 */
export class NotFoundError extends AppError {
	constructor(resource: string = 'Resource') {
		super(`${resource} not found`, StatusCodes.NOT_FOUND, 'NOT_FOUND');
	}
}

/**
 * 400 Bad Request - Invalid input data
 * Usage: throw new ValidationError('Invalid email format', { email: ['Must be valid email'] })
 * Response: { code: 'VALIDATION_ERROR', message: '...', errors: {...} }
 */
export class ValidationError extends AppError {
	constructor(message: string, public errors: Record<string, string[]> = {}) {
		super(message, StatusCodes.BAD_REQUEST, 'VALIDATION_ERROR');
	}
}

/**
 * 409 Conflict - Resource already exists or conflicts
 * Usage: throw new ConflictError('Track already in playlist')
 * Response: { code: 'CONFLICT', message: 'Track already in playlist' }
 */
export class ConflictError extends AppError {
	constructor(message: string) {
		super(message, StatusCodes.CONFLICT, 'CONFLICT');
	}
}
