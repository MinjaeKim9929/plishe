// Jacket variant types - matches backend enum (lowercase for frontend)
export type JacketVariant = 'classic' | 'modern' | 'vintage';

// Info display modes for feed cards
export type HomeVinylDisplayMode = 'minimal' | 'social' | 'rich';

// Playlist visibility
export type PlaylistVisibility = 'PUBLIC' | 'PRIVATE' | 'FOLLOWERS';

// User info attached to playlists
export interface PlaylistUser {
	id: string;
	username: string;
	displayName: string | null;
	profileImage: string | null;
}

// Track from a music platform
export interface Track {
	id: string;
	isrc: string | null;
	title: string;
	artist: string;
	album: string | null;
	duration: number; // milliseconds
	coverUrl: string | null;
	spotifyId: string | null;
	appleMusicId: string | null;
	youtubeMusicId: string | null;
}

// Track within a playlist (includes position and metadata)
export interface PlaylistTrack {
	id: string;
	position: number;
	addedAt: string;
	track: Track;
	addedBy: Pick<PlaylistUser, 'id' | 'username' | 'displayName'> | null;
}

// Playlist without tracks
export interface Playlist {
	id: string;
	name: string;
	description: string | null;
	coverImage: string | null;
	visibility: PlaylistVisibility;
	isCollaborative: boolean;
	trackCount: number;
	variant: JacketVariant;
	createdAt: string;
	updatedAt: string;
	user: PlaylistUser;
}

// Playlist with full track list
export interface PlaylistWithTracks extends Playlist {
	tracks: PlaylistTrack[];
}

// Feed item (playlist with optional social data)
export interface FeedPlaylist extends Playlist {
	likes?: number;
	comments?: number;
	isLiked?: boolean;
}
