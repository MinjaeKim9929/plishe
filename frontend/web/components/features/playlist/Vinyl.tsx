'use client';

import Image from 'next/image';
import { type HTMLAttributes } from 'react';

type VinylSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface VinylProps extends HTMLAttributes<HTMLDivElement> {
	size?: VinylSize;
	coverUrl?: string;
	coverAlt?: string;
	isSpinning?: boolean;
	showPlayButton?: boolean;
	isPlaying?: boolean;
	onPlay?: () => void;
}

const sizeStyles: Record<VinylSize, { vinyl: string; label: string; playBtn: string; spindle: string }> = {
	xs: { vinyl: 'w-20 h-20', label: 'w-7 h-7', playBtn: 'w-6 h-6', spindle: 'w-1 h-1' },
	sm: { vinyl: 'w-32 h-32', label: 'w-11 h-11', playBtn: 'w-8 h-8', spindle: 'w-1.5 h-1.5' },
	md: { vinyl: 'w-44 h-44', label: 'w-15 h-15', playBtn: 'w-10 h-10', spindle: 'w-2 h-2' },
	lg: { vinyl: 'w-56 h-56', label: 'w-19 h-19', playBtn: 'w-12 h-12', spindle: 'w-2.5 h-2.5' },
	xl: { vinyl: 'w-72 h-72', label: 'w-25 h-25', playBtn: 'w-14 h-14', spindle: 'w-3 h-3' },
};

export function Vinyl({
	size = 'md',
	coverUrl,
	coverAlt = 'Cover',
	isSpinning = false,
	showPlayButton = false,
	isPlaying = false,
	onPlay,
	className = '',
	...props
}: VinylProps) {
	const styles = sizeStyles[size];

	return (
		<div className={`relative group ${className}`} {...props}>
			{/* Vinyl Disc */}
			<div
				className={`
            ${styles.vinyl}
            rounded-full
            relative
						shadow-xl
          `}
			>
				{/* Vinyl PNG Image */}
				<Image
					src="/Vinyl.png" //
					alt=""
					fill
					className={`object-cover rounded-full ${isSpinning ? 'animate-spin-slow' : ''}`}
					aria-hidden="true"
					priority
				/>

				{/* Center Label */}
				<div
					className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              ${styles.label}
              rounded-full
              overflow-hidden
              bg-surface-elevated
              shadow-lg
							z-10
							${isSpinning ? 'animate-spin-slow' : ''}
            `}
				>
					{coverUrl ? (
						<div className="relative w-full h-full">
							<Image src={coverUrl} alt={coverAlt} fill className="object-cover" draggable="false" />
							{/* Label shine */}
							<div
								className="absolute inset-0 pointer-events-none"
								style={{
									background: `
                      linear-gradient(
                        135deg,
                        rgba(255,255,255,0.2) 0%,
                        transparent 50%,
                        rgba(0,0,0,0.1) 100%
                      )
                    `,
								}}
							/>
						</div>
					) : (
						<div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary-400 to-primary-600"></div>
					)}
				</div>

				{/* Spindle Hole */}
				<div
					className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              ${styles.spindle}
              rounded-full
              bg-neutral-950
              z-20
            `}
					style={{
						boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)',
					}}
				/>

				{/* Play Button Overlay */}
				{showPlayButton && onPlay && (
					<button
						onClick={(e) => {
							e.stopPropagation();
							onPlay();
						}}
						className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                ${styles.playBtn}
                rounded-full
                bg-black/60 backdrop-blur-sm text-white
                flex items-center justify-center
                opacity-0 group-hover:opacity-100 focus:opacity-100
                transition-all duration-200
                hover:bg-primary-500 hover:scale-110
                hover:cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-bg
                z-30
              `}
						aria-label={isPlaying ? 'Pause' : 'Play'}
					>
						{isPlaying ? (
							<svg className="w-1/2 h-1/2" viewBox="0 0 24 24" fill="currentColor">
								<rect x="6" y="4" width="4" height="16" rx="1" />
								<rect x="14" y="4" width="4" height="16" rx="1" />
							</svg>
						) : (
							<svg className="w-1/2 h-1/2 ml-[5%]" viewBox="0 0 24 24" fill="currentColor">
								<path d="M8 5v14l11-7z" />
							</svg>
						)}
					</button>
				)}
			</div>
		</div>
	);
}
