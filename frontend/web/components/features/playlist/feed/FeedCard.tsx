'use client';

import { VinylJacket } from '@/components/features/playlist';
import { TrackList } from './TrackList';
import { FeedCardInfo } from './FeedCardInfo';
import type { Playlist, PlaylistTrack, HomeVinylDisplayMode, JacketVariant } from '@/types/playlist';

interface FeedCardProps {
	playlist: Playlist;
	isExpanded: boolean;
	tracks: PlaylistTrack[];
	isLoadingTracks: boolean;
	onExpand: () => void;
	onCollapse: () => void;
	homeVinylDisplayMode?: HomeVinylDisplayMode;
	position: 'previous' | 'current' | 'next' | 'hidden';
}

const positionStyles = {
	previous: 'opacity-40 scale-[0.85] pointer-events-none',
	current: 'opacity-100 scale-100',
	next: 'opacity-40 scale-[0.85] pointer-events-none',
	hidden: 'opacity-0 pointer-events-none',
};

export function FeedCard({
	playlist,
	isExpanded,
	tracks,
	isLoadingTracks,
	onExpand,
	onCollapse,
	homeVinylDisplayMode = 'social',
	position,
}: FeedCardProps) {
	const handleClick = () => {
		if (isExpanded) {
			onCollapse();
		} else {
			onExpand();
		}
	};

	// Map backend variant (uppercase) to component variant (lowercase)
	const variant = (playlist.variant?.toLowerCase() || 'modern') as JacketVariant;

	return (
		<div
			className={`
          h-dvh
          snap-start snap-always
          flex flex-col items-center justify-center
          px-4 py-8
          transition-all duration-300 ease-out
          ${positionStyles[position]}
        `}
		>
			<div
				className={`
            relative
            flex flex-col items-center
            max-w-md w-full
            transition-all duration-500 ease-out
            ${isExpanded ? 'gap-0' : 'gap-4'}
          `}
			>
				{/* VinylJacket */}
				<div
					className={`
              transition-all duration-500 ease-out
              ${isExpanded ? 'scale-[0.6] -mb-4' : 'scale-100'}
            `}
				>
					<VinylJacket
						variant={variant}
						size="xl"
						coverUrl={playlist.coverImage || undefined}
						coverAlt={`${playlist.name} cover`}
						title={isExpanded ? undefined : playlist.name}
						creator={isExpanded ? undefined : playlist.user.username}
						trackCount={isExpanded ? undefined : playlist.trackCount}
						showInfo={!isExpanded}
						onClick={handleClick}
					/>
				</div>

				{/* Info Section (when not expanded) */}
				{!isExpanded && <FeedCardInfo playlist={playlist} mode={homeVinylDisplayMode} />}

				{/* Expandable Track List */}
				<div
					className={`
              w-full
              overflow-hidden
              transition-all duration-500 ease-out
              ${isExpanded ? 'max-h-[60vh] opacity-100' : 'max-h-0 opacity-0'}
            `}
				>
					<TrackList
						tracks={tracks}
						isLoading={isLoadingTracks}
						playlistName={playlist.name}
						creatorName={playlist.user.username}
						onClose={onCollapse}
					/>
				</div>
			</div>
		</div>
	);
}
