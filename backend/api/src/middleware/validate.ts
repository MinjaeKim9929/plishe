import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

interface ValidationSchemas {
	body?: ZodType;
	query?: ZodType;
	params?: ZodType;
}

declare global {
	namespace Express {
		interface Request {
			validated?: {
				query?: unknown;
				params?: unknown;
			};
		}
	}
}

/**
 * Validates request data against zod schemas.
 * Validated query/params are stored in req.validated for proper type coercion.
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
			req.validated = {};

			if (schemas.body) {
				req.body = await schemas.body.parseAsync(req.body);
			}
			if (schemas.query) {
				req.validated.query = await schemas.query.parseAsync(req.query);
			}
			if (schemas.params) {
				req.validated.params = await schemas.params.parseAsync(req.params);
			}
			next();
		} catch (err) {
			next(err);
		}
	};
};
