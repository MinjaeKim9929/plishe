import type { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Wraps async route handlers to catch errors automatically.
 *
 * Without this:
 *    app.get('/users', async (req, res, next) => {
 *      try {
 *        const users = await getUsers();
 *        res.json(users);
 *      } catch (err) {
 *        next(err); // Must manually catch
 *      }
 *    });
 *
 * With this:
 *    app.get('/users', asyncHandler(async (req, res) => {
 *      const users = await getUsers();
 *      res.json(users); // Errors auto-forwarded to error handler
 *    }));
 */
export const asyncHandler = (
	fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
): RequestHandler => {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
};
