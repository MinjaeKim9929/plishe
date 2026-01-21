'use client';

import type { Playlist, HomeVinylDisplayMode } from '@/types/playlist';
import { formatCount, formatRelativeTime } from '@/lib/utils';

interface FeedCardInfoProps {
	playlist: Playlist;
	mode: HomeVinylDisplayMode;
	likes?: number;
	comments?: number;
}

export function FeedCardInfo({ playlist, mode, likes = 0, comments = 0 }: FeedCardInfoProps) {
	// Minimal: title + username only
	if (mode === 'minimal') {
		return (
			<div className="text-center">
				<h2 className="font-syne text-xl font-bold text-text-primary">{playlist.name}</h2>
				<p className="text-sm text-text-muted">@{playlist.user.username}</p>
			</div>
		);
	}

	// Social: + likes and comments
	if (mode === 'social') {
		return (
			<div className="text-center space-y-2">
				<h2 className="font-syne text-xl font-bold text-text-primary">{playlist.name}</h2>
				<p className="text-sm text-text-muted">@{playlist.user.username}</p>
				<div className="flex items-center justify-center gap-4 text-text-secondary">
					<button
						className="flex items-center gap-1.5 hover:text-primary-500 transition-colors"
						aria-label={`${likes} likes`}
					>
						<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
						</svg>
						<span className="text-sm">{formatCount(likes)}</span>
					</button>
					<button
						className="flex items-center gap-1.5 hover:text-primary-500 transition-colors"
						aria-label={`${comments} comments`}
					>
						<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
						</svg>
						<span className="text-sm">{formatCount(comments)}</span>
					</button>
				</div>
			</div>
		);
	}

	// Rich: full details
	return (
		<div className="text-center space-y-3 max-w-sm">
			<h2 className="font-syne text-xl font-bold text-text-primary">{playlist.name}</h2>
			<p className="text-sm text-text-muted">@{playlist.user.username}</p>
			{playlist.description && <p className="text-sm text-text-secondary line-clamp-2">{playlist.description}</p>}
			<div className="flex items-center justify-center gap-3 text-xs text-text-muted">
				<span>{playlist.trackCount} tracks</span>
				<span>•</span>
				<span>{playlist.isCollaborative ? 'Collaborative' : 'Personal'}</span>
				<span>•</span>
				<span>{formatRelativeTime(playlist.createdAt)}</span>
			</div>
			<div className="flex items-center justify-center gap-4 text-text-secondary">
				<button
					className="flex items-center gap-1.5 hover:text-primary-500 transition-colors"
					aria-label={`${likes} likes`}
				>
					<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
					</svg>
					<span className="text-sm">{formatCount(likes)}</span>
				</button>
				<button
					className="flex items-center gap-1.5 hover:text-primary-500 transition-colors"
					aria-label={`${comments} comments`}
				>
					<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
					</svg>
					<span className="text-sm">{formatCount(comments)}</span>
				</button>
			</div>
		</div>
	);
}
