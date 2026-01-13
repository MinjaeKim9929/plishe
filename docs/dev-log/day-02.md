# Day 2 - Backend API Foundation

**Date**: January 13, 2026

---

## Summary

Set up the backend API infrastructure with Express 5, Prisma 7, and TypeScript. Created the database schema with core models and started building the middleware layer for error handling and validation.

---

## Completed Tasks

### 1. Backend Configuration

- [x] Fixed `tsconfig.json` with proper CommonJS configuration
  - Target: ES2022
  - Module: CommonJS
  - Module Resolution: Node
  - Configured outDir/rootDir for build output
- [x] Fixed `package.json` dependency organization
  - Moved `@types/uuid` to devDependencies
  - Moved `typescript` to devDependencies

### 2. Dependencies Installed

**Backend (backend/api)**:
- Express 5.2.1
- Zod 4.3.5 (schema validation)
- Helmet 8.1.0 (security headers)
- CORS 2.8.5
- http-status-codes 2.3.0
- uuid 13.0.0
- Prisma 7.2.0 + @prisma/client

### 3. Database Schema (Prisma)

- [x] Created 4 core models in `prisma/schema.prisma`:
  ```
  User
  ├── id, email, username, displayName, bio, profileImage
  ├── createdAt, updatedAt
  └── Relations: playlists[], addedTracks[]

  Playlist
  ├── id, userId, name, description, coverImage
  ├── visibility (PUBLIC/PRIVATE/FOLLOWERS), isCollaborative, trackCount
  ├── createdAt, updatedAt
  └── Relations: user, tracks[]

  Track
  ├── id, isrc, title, artist, album, duration, coverUrl
  ├── Platform IDs: spotifyId, appleMusicId, youtubeMusicId, amazonMusicId, tidalId
  ├── createdAt
  └── Relations: playlistTracks[]

  PlaylistTrack
  ├── id, playlistId, trackId, position, addedById, addedAt
  └── Relations: playlist, track, addedBy
  ```
- [x] Configured Prisma 7 with `prisma.config.ts`
- [x] Successfully ran migration: `init_core_models`

### 4. Core Infrastructure (In Progress)

- [x] `src/lib/errors.ts` - Custom error classes
  - AppError (base class)
  - NotFoundError (404)
  - ValidationError (400)
  - ConflictError (409)
- [x] `src/middleware/async-handler.ts` - Async route wrapper
- [x] `src/middleware/error-handler.ts` - Global error handler
  - Handles Zod validation errors (uses `.issues` for Zod v4)
  - Handles custom AppError types
  - Returns consistent JSON error responses
- [x] `src/middleware/not-found.ts` - 404 handler

---

## Issues Encountered & Resolved

| Issue | Resolution |
|-------|------------|
| Prisma 7 error: `datasource.url` not supported in schema | Move URL to `prisma.config.ts` instead of `schema.prisma` |
| Migration fails with Accelerate URL | Use direct PostgreSQL URL for migrations, Accelerate URL for runtime |
| `ZodError.errors` property not found | Zod v4 uses `.issues` instead of `.errors` |
| `prisma.config.ts` not found | File must be in project root, not in `src/` folder |

---

## Git Status

### Modified Files
- `backend/api/tsconfig.json`
- `backend/api/package.json`
- `backend/api/prisma/schema.prisma`
- `backend/api/prisma.config.ts`

### New Files
```
backend/api/src/
├── lib/
│   └── errors.ts
└── middleware/
    ├── async-handler.ts
    ├── error-handler.ts
    └── not-found.ts
```

---

## Current Project Status

**Phase**: Week 1 - Backend API Development

### Completed from Backend Playlist CRUD milestone:
- [x] Phase 1: Configuration (tsconfig, dependencies)
- [x] Phase 2: Database schema (Prisma models, migration)
- [ ] Phase 3: Core infrastructure (4/7 files done)
- [ ] Phase 4: Playlist module
- [ ] Phase 5: Track module
- [ ] Phase 6: Server setup (app.ts, index.ts, routes)

---

## Next Steps

1. Complete remaining Phase 3 files:
   - `src/middleware/validate.ts` - Zod validation middleware
   - `src/utils/response.ts` - Response helpers
   - `src/utils/pagination.ts` - Pagination utilities
2. Create playlist module (schema, service, controller, routes)
3. Create track module
4. Create Express server entry point
5. Test all API endpoints

---

## Notes

- Prisma 7 introduced breaking changes - `datasource.url` moved to config file
- Zod v4 has API differences from v3 (`.issues` vs `.errors`)
- Using CommonJS modules for backend (simpler Node.js compatibility)
- Database hosted on Prisma Accelerate (PostgreSQL)
