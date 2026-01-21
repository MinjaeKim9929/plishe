import type { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../lib/supabase.js';
import { UnauthorizedError } from '../lib/errors.js';

// Extend Express Request type - adds user property to all requests
declare global {
	namespace Express {
		interface Request {
			user?: {
				id: string;
				email: string;
			};
		}
	}
}

/**
 * Extracts Bearer token from Authorization header
 */
function extractToken(req: Request): string | null {
	const authHeader = req.headers.authorization;
	if (!authHeader?.startsWith('Bearer ')) {
		return null;
	}
	return authHeader.slice(7);
}

/**
 * Middleware that REQUIRES authentication.
 * Returns 401 if no valid token.
 */
export async function requireAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
	try {
		const token = extractToken(req);

		if (!token) {
			throw new UnauthorizedError('No token provided');
		}

		// Verify token with Supabase
		const {
			data: { user },
			error,
		} = await supabaseAdmin.auth.getUser(token);

		if (error || !user) {
			throw new UnauthorizedError('Invalid or expired token');
		}

		// Attach user to request
		req.user = {
			id: user.id,
			email: user.email!,
		};

		next();
	} catch (error) {
		next(error);
	}
}

/**
 * Middleware that OPTIONALLY extracts user if token present.
 * Does not fail if no token - just leaves req.user undefined.
 */
export async function optionalAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
	try {
		const token = extractToken(req);

		if (token) {
			const {
				data: { user },
			} = await supabaseAdmin.auth.getUser(token);

			if (user) {
				req.user = {
					id: user.id,
					email: user.email!,
				};
			}
		}

		next();
	} catch {
		// Silently continue without user
		next();
	}
}
