import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

interface ValidationSchemas {
	body?: ZodType;
	query?: ZodType;
	params?: ZodType;
}

/**
 * Validates request data against zod schemas.
 *
 * Usage:
 *    router.post('/playlists',
 *      validate({ body: createPlaylistSchema }),
 *      asyncHandler(controller.create)
 *    );
 */
export const validate = (schemas: ValidationSchemas): RequestHandler => {
	return async (req, _res, next) => {
		try {
			if (schemas.body) {
				req.body = await schemas.body.parseAsync(req.body);
			}
			if (schemas.query) {
				req.body = await schemas.query.parseAsync(req.body);
			}
			if (schemas.params) {
				req.body = await schemas.params.parseAsync(req.body);
			}
			next();
		} catch (err) {
			next(err);
		}
	};
};
