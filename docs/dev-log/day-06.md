# Day 6 - Authentication Module with Supabase

**Date**: January 21, 2026

---

## Summary

Implemented complete authentication system using Supabase Auth. Created auth middleware for protecting routes, built the auth module with register, login, token refresh, and logout functionality. Added new error classes for authentication and authorization handling.

---

## Completed Tasks

### 1. Supabase Client Setup

#### `src/lib/supabase.ts`
- [x] Created Supabase admin client with service role key
- [x] Environment variable validation (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
- [x] Disabled auto refresh and session persistence for server-side use

### 2. Error Classes

#### `src/lib/errors.ts`
- [x] Added `UnauthorizedError` (401) - Authentication required or invalid
- [x] Added `ForbiddenError` (403) - Authenticated but not authorized
- [x] Added JSDoc comments matching existing error style

### 3. Auth Middleware

#### `src/middleware/auth.ts`
- [x] Extended Express Request type with `user` property
- [x] `extractToken()` - Bearer token extraction from Authorization header
- [x] `requireAuth` - Middleware that requires valid token, returns 401 if missing/invalid
- [x] `optionalAuth` - Middleware that extracts user if token present, continues silently if not
- [x] Token verification via Supabase `auth.getUser()`

### 4. Auth Module

#### `auth.schema.ts`
- [x] `registerSchema` - email, password (min 8 chars), username (3-50 chars, alphanumeric + underscore), displayName (optional)
- [x] `loginSchema` - email, password
- [x] `refreshTokenSchema` - refreshToken
- [x] Type exports: RegisterInput, LoginInput, RefreshTokenInput

#### `auth.service.ts`
- [x] `register()` - Create user in Supabase Auth + local DB
  - Check username availability in local DB
  - Create Supabase Auth user with auto-confirm
  - Create local user record with same ID
- [x] `login()` - Authenticate with email/password
  - Verify credentials via Supabase
  - Return user profile + session tokens
- [x] `refreshToken()` - Refresh access token
  - Exchange refresh token for new token pair
- [x] `getMe()` - Get current user profile

#### `auth.controller.ts`
- [x] `register` - POST handler with 201 response
- [x] `login` - POST handler returning user + tokens
- [x] `refreshToken` - POST handler returning new tokens
- [x] `getMe` - GET handler (protected)
- [x] `logout` - POST handler (protected)
- [x] JSDoc comments on all methods

#### `auth.routes.ts`
- [x] POST `/auth/register` - Public
- [x] POST `/auth/login` - Public
- [x] POST `/auth/refresh` - Public
- [x] GET `/auth/me` - Protected (requireAuth)
- [x] POST `/auth/logout` - Protected (requireAuth)
- [x] JSDoc comments on all routes

### 5. Route Integration

#### `src/routes/v1/index.ts`
- [x] Added auth routes at `/auth`

### 6. Dependencies

#### `package.json`
- [x] Added `@supabase/supabase-js` v2.91.0

---

## API Endpoints Implemented

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/register` | Public | Register new user |
| POST | `/api/v1/auth/login` | Public | Login with email/password |
| POST | `/api/v1/auth/refresh` | Public | Refresh access token |
| GET | `/api/v1/auth/me` | Required | Get current user profile |
| POST | `/api/v1/auth/logout` | Required | Logout (client-side token invalidation) |

---

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Registration Flow                         │
├─────────────────────────────────────────────────────────────┤
│  1. Client sends POST /auth/register                        │
│     { email, password, username, displayName? }             │
│                          │                                   │
│                          ▼                                   │
│  2. Check username availability in local DB                 │
│                          │                                   │
│                          ▼                                   │
│  3. Create user in Supabase Auth                            │
│     (auto-confirms email for MVP)                           │
│                          │                                   │
│                          ▼                                   │
│  4. Create user record in local DB (same UUID)              │
│                          │                                   │
│                          ▼                                   │
│  5. Return user profile (201 Created)                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      Login Flow                              │
├─────────────────────────────────────────────────────────────┤
│  1. Client sends POST /auth/login                           │
│     { email, password }                                     │
│                          │                                   │
│                          ▼                                   │
│  2. Verify credentials with Supabase                        │
│                          │                                   │
│                          ▼                                   │
│  3. Fetch user profile from local DB                        │
│                          │                                   │
│                          ▼                                   │
│  4. Return { user, session: { accessToken, refreshToken } } │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  Protected Route Flow                        │
├─────────────────────────────────────────────────────────────┤
│  1. Client sends request with header:                       │
│     Authorization: Bearer <accessToken>                     │
│                          │                                   │
│                          ▼                                   │
│  2. requireAuth middleware extracts token                   │
│                          │                                   │
│                          ▼                                   │
│  3. Verify token with Supabase auth.getUser()               │
│                          │                                   │
│                          ▼                                   │
│  4. Attach user { id, email } to req.user                   │
│                          │                                   │
│                          ▼                                   │
│  5. Continue to route handler                               │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure After Day 6

```
backend/api/src/
├── lib/
│   ├── errors.ts               # Added UnauthorizedError, ForbiddenError
│   ├── prisma.ts
│   └── supabase.ts             # (new) Supabase admin client
├── middleware/
│   ├── async-handler.ts
│   ├── auth.ts                 # (new) requireAuth, optionalAuth
│   ├── error-handler.ts
│   ├── not-found.ts
│   └── validate.ts
├── modules/
│   ├── auth/                   # (new)
│   │   ├── auth.schema.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   └── auth.routes.ts
│   ├── playlists/
│   ├── tracks/
│   └── users/
├── routes/
│   └── v1/
│       └── index.ts            # Added auth routes
├── app.ts
└── index.ts
```

---

## Code Patterns

### Express Request Type Extension

```typescript
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
```

### Auth Middleware Usage

```typescript
// Route that requires authentication
router.get('/me', requireAuth, asyncHandler(controller.getMe));

// Route that optionally uses auth
router.get('/playlists', optionalAuth, asyncHandler(controller.list));
```

### Accessing User in Controllers

```typescript
async getMe(req: Request, res: Response) {
  // req.user is guaranteed by requireAuth middleware
  const user = await authService.getMe(req.user!.id);
  sendSuccess(res, user);
}
```

---

## Environment Variables Required

```bash
# Supabase (required for auth)
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

---

## Current Project Status

**Phase**: Week 2 - Authentication & Frontend (In Progress)

### Milestone Progress:
- [x] Backend API complete (Day 4)
- [x] Frontend Pattern Library (Day 5)
- [x] UI Components: Button, Input, Vinyl (Day 5)
- [x] Authentication module (Day 6)
- [x] Auth middleware (Day 6)
- [ ] Integrate auth with existing endpoints
- [ ] Frontend auth pages (login, register)
- [ ] Social module (follows, likes, comments)

---

## Next Steps

1. Protect playlist/user endpoints that require authentication
2. Build frontend auth pages (login, register)
3. Implement auth state management (Zustand store)
4. Add user session handling on frontend
5. Social module (follows, likes, comments)

---

## Notes

- Using Supabase Auth for user management and JWT verification
- Local DB stores user profile data, synced with Supabase Auth user ID
- Email auto-confirmed for MVP (disable in production)
- Logout is client-side only (Supabase handles token invalidation)
- Two middleware options: `requireAuth` (strict) and `optionalAuth` (permissive)
