import { z } from 'zod';

/**
 * Zod schema for pagination query parameters.
 *
 * Accepts: ?page=1&limit=20
 * Defaults: page=1, limit=20
 * Limits: page >= 1, limit 1-100
 */
export const paginationSchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type PaginationQuery = z.infer<typeof paginationSchema>;

/**
 * Convert page/limit to Prisma skip/take.
 *
 * Usage:
 *    const { skip, take } = getPaginationParams({ page: 2, limit: 20 });
 *    // skip = 20, take = 20
 */
export function getPaginationParams(page = 1, limit = 20) {
	return {
		skip: (page - 1) * limit,
		take: limit,
	};
}

/**
 * Build pagination metadata for response.
 *
 * Usage:
 *    const meta = createPaginationMeta(100, 2, 20);
 *    // { total: 100, page: 2, limit: 20, hasMore: true, totalPages: 5 }
 */
export function createPaginationMeta(total: number, page: number, limit: number) {
	return {
		total,
		page,
		limit,
		hasMore: page * limit < total,
		totalPages: Math.ceil(total / limit),
	};
}
