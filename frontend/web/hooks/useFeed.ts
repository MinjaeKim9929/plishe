'use client';

import { useState, useCallback, useEffect } from 'react';
import { fetchPlaylists, fetchPlaylistTracks } from '@/lib/api/playlists';
import type { Playlist, PlaylistTrack } from '@/types/playlist';
import type { PaginationMeta } from '@/types/api';

interface UseFeedReturn {
	playlists: Playlist[];
	isLoading: boolean;
	isLoadingMore: boolean;
	error: Error | null;
	hasMore: boolean;
	loadMore: () => Promise<void>;
	refresh: () => Promise<void>;
	// Track expansion
	expandedPlaylistId: string | null;
	expandedTracks: PlaylistTrack[];
	isLoadingTracks: boolean;
	expandPlaylist: (playlistId: string) => Promise<void>;
	collapsePlaylist: () => void;
}

export function useFeed(initialLimit = 10): UseFeedReturn {
	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [meta, setMeta] = useState<PaginationMeta | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [page, setPage] = useState(1);

	// Track expansion state
	const [expandedPlaylistId, setExpandedPlaylistId] = useState<string | null>(null);
	const [expandedTracks, setExpandedTracks] = useState<PlaylistTrack[]>([]);
	const [isLoadingTracks, setIsLoadingTracks] = useState(false);

	const loadPlaylists = useCallback(
		async (pageNum: number, append = false) => {
			try {
				if (append) {
					setIsLoadingMore(true);
				} else {
					setIsLoading(true);
				}

				const response = await fetchPlaylists({
					page: pageNum,
					limit: initialLimit,
					visibility: 'PUBLIC',
				});

				if (append) {
					setPlaylists((prev) => [...prev, ...response.data]);
				} else {
					setPlaylists(response.data);
				}

				setMeta(response.meta || null);
				setError(null);
			} catch (err) {
				setError(err instanceof Error ? err : new Error('Failed to load feed'));
			} finally {
				setIsLoading(false);
				setIsLoadingMore(false);
			}
		},
		[initialLimit],
	);

	// Initial load
	useEffect(() => {
		loadPlaylists(1);
	}, [loadPlaylists]);

	// Load more (infinite scroll)
	const loadMore = useCallback(async () => {
		if (isLoadingMore || !meta || page >= meta.totalPages) return;
		const nextPage = page + 1;
		setPage(nextPage);
		await loadPlaylists(nextPage, true);
	}, [isLoadingMore, meta, page, loadPlaylists]);

	// Refresh feed
	const refresh = useCallback(async () => {
		setPage(1);
		setExpandedPlaylistId(null);
		setExpandedTracks([]);
		await loadPlaylists(1, false);
	}, [loadPlaylists]);

	// Expand playlist to show tracks
	const expandPlaylist = useCallback(
		async (playlistId: string) => {
			// Toggle off if already expanded
			if (expandedPlaylistId === playlistId) {
				setExpandedPlaylistId(null);
				setExpandedTracks([]);
				return;
			}

			setExpandedPlaylistId(playlistId);
			setIsLoadingTracks(true);
			setExpandedTracks([]);

			try {
				const response = await fetchPlaylistTracks(playlistId);
				setExpandedTracks(response.data);
			} catch (err) {
				console.error('Failed to load tracks:', err);
				setExpandedTracks([]);
			} finally {
				setIsLoadingTracks(false);
			}
		},
		[expandedPlaylistId],
	);

	// Collapse expanded playlist
	const collapsePlaylist = useCallback(() => {
		setExpandedPlaylistId(null);
		setExpandedTracks([]);
	}, []);

	const hasMore = meta ? page < meta.totalPages : false;

	return {
		playlists,
		isLoading,
		isLoadingMore,
		error,
		hasMore,
		loadMore,
		refresh,
		expandedPlaylistId,
		expandedTracks,
		isLoadingTracks,
		expandPlaylist,
		collapsePlaylist,
	};
}
