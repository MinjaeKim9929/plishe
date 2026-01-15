import { z } from 'zod';

// Update user profile
export const updateUserSchema = z.object({
	displayName: z.string().min(1).max(50).optional(),
	bio: z.string().max(500).optional(),
	profileImage: z.url().nullable().optional(),
});

// User ID param
export const userIdSchema = z.object({
	id: z.uuid(),
});

// Username param
export const usernameSchema = z.object({
	username: z.string().min(3).max(50),
});

// Search users query
export const searchUsersSchema = z.object({
	q: z.string().min(1).max(50),
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(50).default(20),
});

// List query (pagination)
export const listUsersSchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
});

// Type exports
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type SearchUsersQuery = z.infer<typeof searchUsersSchema>;
export type ListUsersQuery = z.infer<typeof listUsersSchema>;
