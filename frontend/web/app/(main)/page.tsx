'use client';

import { useCallback, useState } from 'react';
import { FeedContainer, FeedCard } from '@/components/features/playlist/feed';
import { useFeed } from '@/hooks';
import type { HomeVinylDisplayMode } from '@/types/playlist';

export default function FeedPage() {
	const {
		playlists,
		isLoading,
		isLoadingMore,
		error,
		hasMore,
		loadMore,
		expandedPlaylistId,
		expandedTracks,
		isLoadingTracks,
		expandPlaylist,
		collapsePlaylist,
	} = useFeed(10);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [infoMode] = useState<HomeVinylDisplayMode>('social');

	// Determine position relative to current item
	const getPosition = (index: number): 'previous' | 'current' | 'next' | 'hidden' => {
		if (index === currentIndex) return 'current';
		if (index === currentIndex - 1) return 'previous';
		if (index === currentIndex + 1) return 'next';
		return 'hidden';
	};

	// Handle index change from scroll
	const handleIndexChange = useCallback(
		(newIndex: number) => {
			if (newIndex !== currentIndex) {
				setCurrentIndex(newIndex);
				// Collapse any expanded playlist when scrolling
				if (expandedPlaylistId) {
					collapsePlaylist();
				}
			}
		},
		[currentIndex, expandedPlaylistId, collapsePlaylist],
	);

	// Loading state
	if (isLoading) {
		return (
			<div className="h-dvh flex items-center justify-center">
				<div className="animate-pulse flex flex-col items-center gap-4">
					<div className="w-72 h-72 bg-surface-elevated rounded-lg" />
					<div className="w-48 h-4 bg-surface-elevated rounded" />
					<div className="w-32 h-3 bg-surface-elevated rounded" />
				</div>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className="h-dvh flex items-center justify-center">
				<div className="text-center px-4">
					<p className="text-text-primary text-lg mb-4">Failed to load feed</p>
					<p className="text-text-muted text-sm mb-4">{error.message}</p>
					<button onClick={() => window.location.reload()} className="text-primary-500 hover:underline">
						Try again
					</button>
				</div>
			</div>
		);
	}

	// Empty state
	if (playlists.length === 0) {
		return (
			<div className="h-dvh flex items-center justify-center">
				<div className="text-center px-4">
					<div className="w-24 h-24 mx-auto mb-4 rounded-full bg-surface-elevated flex items-center justify-center">
						<svg className="w-12 h-12 text-text-muted" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
						</svg>
					</div>
					<p className="text-text-primary text-lg mb-2">No playlists yet</p>
					<p className="text-text-muted">Be the first to create one!</p>
				</div>
			</div>
		);
	}

	return (
		<FeedContainer onEndReached={hasMore ? loadMore : undefined} onIndexChange={handleIndexChange}>
			{playlists.map((playlist, index) => (
				<FeedCard
					key={playlist.id}
					playlist={playlist}
					isExpanded={expandedPlaylistId === playlist.id}
					tracks={expandedPlaylistId === playlist.id ? expandedTracks : []}
					isLoadingTracks={expandedPlaylistId === playlist.id && isLoadingTracks}
					onExpand={() => expandPlaylist(playlist.id)}
					onCollapse={collapsePlaylist}
					homeVinylDisplayMode={infoMode}
					position={getPosition(index)}
				/>
			))}

			{/* Loading indicator for infinite scroll */}
			{isLoadingMore && (
				<div className="h-20 flex items-center justify-center">
					<div className="animate-spin w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full" />
				</div>
			)}
		</FeedContainer>
	);
}
