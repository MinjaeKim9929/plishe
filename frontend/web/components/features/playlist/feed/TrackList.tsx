'use client';

import Image from 'next/image';
import { formatDuration } from '@/lib/utils';
import type { PlaylistTrack } from '@/types/playlist';

interface TrackListProps {
	tracks: PlaylistTrack[];
	isLoading: boolean;
	playlistName: string;
	creatorName: string;
	onClose: () => void;
}

export function TrackList({ tracks, isLoading, playlistName, creatorName, onClose }: TrackListProps) {
	if (isLoading) {
		return (
			<div className="bg-surface rounded-xl p-4 mt-4 border border-border-subtle">
				<div className="animate-pulse space-y-3">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="flex gap-3">
							<div className="w-10 h-10 bg-surface-hover rounded" />
							<div className="flex-1 space-y-2">
								<div className="h-4 bg-surface-hover rounded w-3/4" />
								<div className="h-3 bg-surface-hover rounded w-1/2" />
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="bg-surface rounded-xl overflow-hidden mt-4 border border-border-subtle">
			{/* Header */}
			<div className="flex items-center justify-between p-4 border-b border-border-subtle">
				<div>
					<h3 className="font-syne font-semibold text-text-primary">{playlistName}</h3>
					<p className="text-xs text-text-muted">@{creatorName}</p>
				</div>
				<button
					onClick={onClose}
					className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors"
					aria-label="Close track list"
				>
					<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
			</div>

			{/* Track List */}
			<div className="max-h-[50vh] overflow-y-auto">
				{tracks.length === 0 ? (
					<div className="p-8 text-center text-text-muted">No tracks in this playlist yet</div>
				) : (
					<ul className="divide-y divide-border-subtle">
						{tracks.map((item, index) => (
							<li key={item.id}>
								<button
									className="w-full flex items-center gap-3 p-3 hover:bg-surface-hover transition-colors text-left"
									aria-label={`Play ${item.track.title} by ${item.track.artist}`}
								>
									{/* Position */}
									<span className="w-6 text-center text-sm text-text-muted tabular-nums">{index + 1}</span>

									{/* Cover */}
									{item.track.coverUrl ? (
										<div className="relative w-10 h-10 rounded overflow-hidden shrink-0">
											<Image src={item.track.coverUrl} alt="" fill className="object-cover" />
										</div>
									) : (
										<div className="w-10 h-10 rounded bg-surface-elevated flex items-center justify-center shrink-0">
											<svg className="w-5 h-5 text-text-muted" viewBox="0 0 24 24" fill="currentColor">
												<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
											</svg>
										</div>
									)}

									{/* Info */}
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-text-primary truncate">{item.track.title}</p>
										<p className="text-xs text-text-muted truncate">{item.track.artist}</p>
									</div>

									{/* Duration */}
									<span className="text-xs text-text-muted tabular-nums">{formatDuration(item.track.duration)}</span>

									{/* Platform badges */}
									<div className="flex gap-1">
										{item.track.spotifyId && (
											<span className="w-4 h-4 rounded-full bg-spotify" title="Available on Spotify">
												<span className="sr-only">Spotify</span>
											</span>
										)}
										{item.track.appleMusicId && (
											<span className="w-4 h-4 rounded-full bg-apple-music" title="Available on Apple Music">
												<span className="sr-only">Apple Music</span>
											</span>
										)}
										{item.track.youtubeMusicId && (
											<span className="w-4 h-4 rounded-full bg-youtube-music" title="Available on YouTube Music">
												<span className="sr-only">YouTube Music</span>
											</span>
										)}
									</div>
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
