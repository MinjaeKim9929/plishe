import { apiClient } from './client';
import type { ApiResponse } from '@/types';
import type { Playlist, PlaylistTrack, PlaylistWithTracks } from '@/types';

// Parameters for fetching playlists
interface FetchPlaylistsParams {
	page?: number;
	limit?: number;
	visibility?: 'PUBLIC' | 'PRIVATE' | 'FOLLOWERS';
}

// Fetch paginated list of playlists for feed
export async function fetchPlaylists(params: FetchPlaylistsParams = {}) {
	return apiClient.get<ApiResponse<Playlist[]>>('/playlists', {
		page: params.page || 1,
		limit: params.limit || 10,
		...(params.visibility && { visibility: params.visibility }),
	});
}

// Fetch single playlist by ID
export async function fetchPlaylistById(id: string) {
	return apiClient.get<ApiResponse<PlaylistWithTracks>>(`/playlists/${id}`);
}

// Fetch tracks for a playlist (paginated)
export async function fetchPlaylistTracks(playlistId: string, page = 1, limit = 50) {
	return apiClient.get<ApiResponse<PlaylistTrack[]>>(`/playlists/${playlistId}/tracks`, { page, limit });
}

// Fetch playlists by user ID
export async function fetchUserPlaylists(userId: string, page = 1, limit = 20) {
	return apiClient.get<ApiResponse<Playlist[]>>(`/users/${userId}/playlists`, { page, limit });
}
