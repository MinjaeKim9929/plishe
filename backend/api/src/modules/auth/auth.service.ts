import { supabaseAdmin } from '../../lib/supabase';
import { prisma } from '../../lib/prisma';
import { ConflictError, UnauthorizedError } from '../../lib/errors';
import type { RegisterInput, LoginInput, RefreshTokenInput } from './auth.schema';

export const authService = {
	/**
	 * Register new user in Supabase + create local DB record
	 */
	async register(data: RegisterInput) {
		// Check if username is taken in local DB
		const existingUser = await prisma.user.findUnique({
			where: { username: data.username },
		});

		if (existingUser) {
			throw new ConflictError('Username already taken');
		}

		// Create user in Supabase Auth
		const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
			email: data.email,
			password: data.password,
			email_confirm: true, // Auto-confirm for now
		});

		if (authError) {
			if (authError.message.includes('already registered')) {
				throw new ConflictError('Email already registered');
			}
			throw new Error(authError.message);
		}

		// Create user in local DB (same ID as Supabase)
		const user = await prisma.user.create({
			data: {
				id: authData.user.id,
				email: data.email,
				username: data.username,
				displayName: data.displayName || data.username,
			},
			select: {
				id: true,
				email: true,
				username: true,
				displayName: true,
				profileImage: true,
				createdAt: true,
			},
		});

		return user;
	},

	/**
	 * Login with email/password
	 */
	async login(data: LoginInput) {
		const { data: authData, error } = await supabaseAdmin.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		if (error) {
			throw new UnauthorizedError('Invalid email or password');
		}

		// Fetch user from local DB
		const user = await prisma.user.findUnique({
			where: { id: authData.user.id },
			select: {
				id: true,
				email: true,
				username: true,
				displayName: true,
				profileImage: true,
			},
		});

		return {
			user,
			session: {
				accessToken: authData.session.access_token,
				refreshToken: authData.session.refresh_token,
				expiresAt: authData.session.expires_at,
			},
		};
	},

	/**
	 * Refresh access token
	 */
	async refreshToken(data: RefreshTokenInput) {
		const { data: authData, error } = await supabaseAdmin.auth.refreshSession({
			refresh_token: data.refreshToken,
		});

		if (error || !authData.session) {
			throw new UnauthorizedError('Invalid refresh token');
		}

		return {
			accessToken: authData.session.access_token,
			refreshToken: authData.session.refresh_token,
			expiresAt: authData.session.expires_at,
		};
	},

	/**
	 * Get current user profile
	 */
	async getMe(userId: string) {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				email: true,
				username: true,
				displayName: true,
				bio: true,
				profileImage: true,
				createdAt: true,
			},
		});

		return user;
	},
};
