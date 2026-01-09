# Plishe (플리셰)

> **"Playlist Share"** — A music-based social media platform where your taste in music becomes your social profile.

Plishe is a portmanteau of "Playlist Share" in Korean pronunciation (플리셰), with a playful nod to the word "cliché" — because sharing your favorite music is never a cliché.

## Overview

Plishe is a social media platform centered around music discovery and sharing. Users can create playlists, import from streaming services, follow friends, share music, and chat — all while their music plays seamlessly on their preferred streaming platform.

### Core Features

- **Playlist Management**: Create playlists natively or import from Spotify (MVP), with Apple Music support planned
- **Social Feed**: Instagram-like feed for sharing playlists and tracks
- **Music Playback Control**: Control Spotify playback directly from Plishe
- **Social Features**: Follow users, like/comment on posts, discover new music through your network
- **Real-time Chat**: Direct messaging with friends
- **Cross-Platform Sync**: Import and export playlists across different streaming services (future)

## Tech Stack

### Frontend
- **Next.js 16.0.7** (App Router) - React framework with server-side rendering
- **React 19.2.0** - UI library with modern features
- **TypeScript 5.x** - Type safety and enhanced developer experience
- **Tailwind CSS v4** - Utility-first styling with dark mode support
- **Zustand** - Lightweight state management

### Backend & Infrastructure
- **Supabase** - Backend-as-a-Service providing:
  - PostgreSQL database (relational data with ACID compliance)
  - Authentication (email/password + OAuth with Spotify)
  - Real-time subscriptions (for chat and live feed updates)
  - File storage (profile pictures, playlist cover images)
  - Row Level Security (RLS) for data protection
- **Prisma** - Type-safe database ORM and migration tool

### Music APIs (MVP)
- **Spotify Web API** - Primary music service integration
- **Spotify Web Playback SDK** - In-app playback control
- *(Apple Music MusicKit JS planned for Phase 4)*

### Deployment
- **Vercel** - Hosting and continuous deployment
- **Supabase Cloud** - Database and backend services (free tier)

## Why These Technologies?

| Technology | Reason |
|-----------|---------|
| **Next.js 16 (App Router)** | Server Components reduce client bundle size, built-in API routes eliminate need for separate backend, excellent SEO for discoverability, image optimization out of the box |
| **Supabase** | All-in-one solution reduces complexity, PostgreSQL provides ACID compliance for critical social features (follows, likes), generous free tier (500MB DB, 1GB storage), real-time built-in for chat, can migrate to self-hosted later if needed |
| **Prisma** | Type-safe queries prevent runtime errors, automatic migrations track schema changes, generated TypeScript types, prevents SQL injection vulnerabilities |
| **Zustand** | 10x less boilerplate than Redux, simpler than Context API for complex state, built-in devtools, excellent TypeScript support, only 1.2KB bundle size |
| **Tailwind v4** | Utility-first enables rapid prototyping, consistent design system prevents visual inconsistencies, built-in dark mode (critical for music app aesthetics), JIT compiler reduces CSS bundle size |
| **Spotify First** | Best documented API, 500M+ users (largest addressable market), Web Playback SDK enables in-app control, reliable OAuth 2.0 flow, 30-second preview clips for non-premium users |

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account ([Sign up free](https://supabase.com))
- Spotify Developer account ([Sign up free](https://developer.spotify.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/plishe.git
cd plishe

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys (see below)

# Initialize database
npm run db:push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Spotify
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback/spotify

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Getting API Keys:**

1. **Supabase**: Create project at [supabase.com](https://supabase.com) → Project Settings → API
2. **Spotify**: Create app at [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) → Add redirect URI: `http://localhost:3000/api/auth/callback/spotify`

## Development Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:3000
npm run build            # Build for production
npm start                # Start production server

# Database (Prisma)
npm run db:push          # Push schema changes to database
npm run db:studio        # Open Prisma Studio (database GUI)
npm run db:generate      # Generate Prisma Client types

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking (if configured)
```

## Project Structure

```
plishe/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes (grouped route)
│   │   ├── login/                # Login page
│   │   └── signup/               # Signup page
│   ├── (main)/                   # Main app (requires auth)
│   │   ├── feed/                 # Social feed
│   │   ├── profile/[username]/   # User profiles
│   │   ├── playlist/[id]/        # Playlist detail page
│   │   ├── messages/             # Direct messages
│   │   └── discover/             # Discover new music/users
│   ├── api/                      # API routes
│   │   ├── auth/                 # Auth endpoints
│   │   ├── playlists/            # Playlist CRUD
│   │   ├── posts/                # Social posts
│   │   └── spotify/              # Spotify proxy endpoints
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── features/                 # Feature-specific components
│   │   ├── playlist/             # Playlist components
│   │   ├── feed/                 # Feed components
│   │   ├── auth/                 # Auth forms
│   │   └── player/               # Music player components
│   └── layouts/                  # Layout components
│       ├── header.tsx
│       ├── sidebar.tsx
│       └── footer.tsx
├── lib/                          # Utilities and configurations
│   ├── supabase/                 # Supabase client
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── middleware.ts         # Auth middleware
│   ├── spotify/                  # Spotify API integration
│   │   ├── client.ts             # Spotify client
│   │   ├── auth.ts               # OAuth flow
│   │   └── utils.ts              # Helper functions
│   ├── db/                       # Database utilities
│   │   └── prisma.ts             # Prisma client instance
│   └── utils/                    # Helper functions
│       ├── cn.ts                 # Tailwind class merger
│       └── helpers.ts
├── prisma/                       # Database schema
│   ├── schema.prisma             # Prisma schema
│   └── migrations/               # Migration history
├── public/                       # Static assets
│   ├── images/
│   └── icons/
├── types/                        # TypeScript type definitions
│   ├── database.ts               # Database types
│   ├── spotify.ts                # Spotify API types
│   └── index.ts                  # Shared types
├── hooks/                        # Custom React hooks
│   ├── use-auth.ts               # Authentication hook
│   ├── use-player.ts             # Music player hook
│   └── use-playlists.ts          # Playlist data hook
├── store/                        # Zustand stores
│   ├── auth.ts                   # Auth state
│   ├── player.ts                 # Player state
│   └── ui.ts                     # UI state (modals, etc.)
└── middleware.ts                 # Next.js middleware (auth protection)
```

## Development Phases

### Phase 1: Foundation & Authentication ✨ (Current MVP)
- [ ] Project setup (Next.js, Tailwind, Supabase, Prisma)
- [ ] Database schema design
- [ ] User authentication (email + password)
- [ ] Spotify OAuth integration
- [ ] Basic profile management (username, bio, profile picture)

### Phase 2: Playlist Management
- [ ] Create playlists in Plishe
- [ ] Import playlists from Spotify
- [ ] Display playlist with track details
- [ ] Edit/delete playlists
- [ ] Playlist cover image upload

### Phase 3: Social Features - Core
- [ ] User profiles (view others' playlists)
- [ ] Follow/unfollow users
- [ ] Social feed (chronological posts)
- [ ] Post a playlist to feed
- [ ] Like posts
- [ ] Comment on posts

### Phase 4: Music Playback
- [ ] Spotify Web Playback SDK integration
- [ ] Play/pause/skip controls
- [ ] Display now playing
- [ ] Queue management
- [ ] Volume control

### Phase 5: Real-time & Chat
- [ ] Real-time feed updates (new posts appear live)
- [ ] Direct messaging (1-on-1 chat)
- [ ] Online status indicators
- [ ] Unread message notifications

### Phase 6: Discovery & Search
- [ ] Search users by username
- [ ] Search playlists by name/tags
- [ ] Discover trending playlists
- [ ] Recommended users to follow
- [ ] Genre/mood-based discovery

### Phase 7: Advanced Features
- [ ] Playlist export to Spotify
- [ ] Collaborative playlists
- [ ] Apple Music integration
- [ ] Playlist analytics (most played tracks)
- [ ] Dark/light theme toggle

### Phase 8: Polish & Optimization
- [ ] Performance optimization (code splitting, lazy loading)
- [ ] SEO optimization (meta tags, OpenGraph)
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Error handling and loading states
- [ ] Progressive Web App (PWA) features

## Database Schema (High-Level)

```prisma
User
├── id
├── email
├── username
├── displayName
├── profilePicture
├── bio
├── createdAt
└── relationships: followers[], following[], playlists[], posts[]

Playlist
├── id
├── name
├── description
├── coverImage
├── userId (creator)
├── tracks[]
├── isPublic
├── spotifyId (if imported)
└── createdAt

Track
├── id
├── playlistId
├── spotifyId
├── title
├── artist
├── album
├── duration
└── position

Post
├── id
├── userId
├── playlistId
├── caption
├── likes[]
├── comments[]
└── createdAt

Follow
├── followerId
├── followingId
└── createdAt

SpotifyConnection
├── userId
├── spotifyUserId
├── accessToken (encrypted)
├── refreshToken (encrypted)
└── expiresAt
```

## Contributing

This is a portfolio project, but suggestions and feedback are welcome! Feel free to open issues for bugs or feature requests.

## Roadmap

- **Q1 2025**: Phase 1-2 (Auth + Playlists)
- **Q2 2025**: Phase 3-4 (Social + Playback)
- **Q3 2025**: Phase 5-6 (Realtime + Discovery)
- **Q4 2025**: Phase 7-8 (Advanced features + Polish)
- **2026**: Mobile apps (React Native)

## License

MIT License - see LICENSE file for details

## Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

---

**Plishe (플리셰)** — Share your soundtrack, discover theirs.
