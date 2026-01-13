import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface SuccessResponse<T> {
	success: true;
	data: T;
	meta?: Record<string, unknown>;
}

/**
 * Send a success response with data.
 *
 * Usage:
 *    sendSuccess(res, { id: '123', name: 'My Playlist' })
 *
 *    sendSuccess(res, playlists, 200, { total: 100, page: 1 })
 *
 * Response: { success: true, data: { ... }, meta?: { ... }}
 */
export function sendSuccess<T>(
	res: Response,
	data: T,
	statusCode: number = StatusCodes.OK,
	meta?: Record<string, unknown>
): void {
	const response: SuccessResponse<T> = { success: true, data };
	if (meta) response.meta = meta;
	res.status(statusCode).json(response);
}

/**
 * Send a 201 Created response.
 *
 * Usage:
 *    sendCreated(res, newPlaylist);
 */
export function sendCreated<T>(res: Response, data: T): void {
	sendSuccess(res, data, StatusCodes.CREATED);
}

/**
 * Send a 204 No Content response (for DELETE operations)
 *
 * Usage:
 *    sendNoContent(res);
 */
export function sendNoContent(res: Response): void {
	res.status(StatusCodes.NO_CONTENT).send();
}
