'use client';

import Image from 'next/image';
import { type HTMLAttributes } from 'react';

type VinylSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type VinylColor = 'black' | 'red' | 'blue' | 'orange' | 'purple' | 'gold';

interface VinylProps extends HTMLAttributes<HTMLDivElement> {
	size?: VinylSize;
	color?: VinylColor;
	coverUrl?: string;
	coverAlt?: string;
	fallbackText?: string;
	isSpinning?: boolean;
	showPlayButton?: boolean;
	isPlaying?: boolean;
	onPlay?: () => void;
}

const sizeStyles: Record<VinylSize, { vinyl: string; label: string; playBtn: string; spindle: string }> = {
	xs: { vinyl: 'w-20 h-20', label: 'w-8 h-8', playBtn: 'w-6 h-6', spindle: 'w-1.5 h-1.5' },
	sm: { vinyl: 'w-32 h-32', label: 'w-14 h-14', playBtn: 'w-8 h-8', spindle: 'w-2 h-2' },
	md: { vinyl: 'w-44 h-44', label: 'w-20 h-20', playBtn: 'w-10 h-10', spindle: 'w-2.5 h-2.5' },
	lg: { vinyl: 'w-56 h-56', label: 'w-24 h-24', playBtn: 'w-12 h-12', spindle: 'w-3 h-3' },
	xl: { vinyl: 'w-72 h-72', label: 'w-32 h-32', playBtn: 'w-14 h-14', spindle: 'w-3.5 h-3.5' },
};

const vinylColors: Record<VinylColor, { base: string; groove: string; highlight: string }> = {
	black: { base: '#0a0a0a', groove: '#1a1a1a', highlight: 'rgba(255,255,255,0.08)' },
	red: { base: '#4a0a0a', groove: '#6a1a1a', highlight: 'rgba(255,100,100,0.1)' },
	blue: { base: '#0a0a3a', groove: '#1a1a5a', highlight: 'rgba(100,150,255,0.1)' },
	orange: { base: '#3a1a0a', groove: '#5a2a1a', highlight: 'rgba(255,150,50,0.1)' },
	purple: { base: '#2a0a3a', groove: '#4a1a5a', highlight: 'rgba(200,100,255,0.1)' },
	gold: { base: '#3a2a0a', groove: '#5a4a1a', highlight: 'rgba(255,215,0,0.15)' },
};

export function Vinyl({
	size = 'md',
	color = 'black',
	coverUrl,
	coverAlt = 'Cover',
	fallbackText,
	isSpinning = false,
	showPlayButton = false,
	isPlaying = false,
	onPlay,
	className = '',
	...props
}: VinylProps) {
	const styles = sizeStyles[size];
	const colors = vinylColors[color];

	// Generate groove pattern
	const groovePattern = `
      radial-gradient(circle at 50% 50%,
        /* Center hole area */
        transparent 0%,
        transparent 22%,
        
        /* Inner dead wax / run-out area */
        ${colors.base} 22%,
        ${colors.base} 26%,
        
        /* Grooves - varying density */
        ${colors.groove} 26%, ${colors.base} 26.5%,
        ${colors.groove} 28%, ${colors.base} 28.5%,
        ${colors.groove} 30%, ${colors.base} 30.3%,
        ${colors.groove} 32%, ${colors.base} 32.3%,
        ${colors.groove} 34%, ${colors.base} 34.3%,
        ${colors.groove} 36.5%, ${colors.base} 36.8%,
        ${colors.groove} 39%, ${colors.base} 39.3%,
        ${colors.groove} 41.5%, ${colors.base} 41.8%,
        ${colors.groove} 44%, ${colors.base} 44.3%,
        ${colors.groove} 47%, ${colors.base} 47.3%,
        ${colors.groove} 50%, ${colors.base} 50.3%,
        ${colors.groove} 53.5%, ${colors.base} 53.8%,
        ${colors.groove} 57%, ${colors.base} 57.3%,
        ${colors.groove} 61%, ${colors.base} 61.3%,
        ${colors.groove} 65%, ${colors.base} 65.3%,
        ${colors.groove} 69.5%, ${colors.base} 69.8%,
        ${colors.groove} 74%, ${colors.base} 74.3%,
        ${colors.groove} 79%, ${colors.base} 79.3%,
        ${colors.groove} 84%, ${colors.base} 84.3%,
        ${colors.groove} 89%, ${colors.base} 89.3%,
        
        /* Outer rim */
        ${colors.groove} 94%,
        ${colors.base} 94%,
        ${colors.base} 97%,
        #000 97%,
        #000 100%
      )
    `;

	return (
		<div className={`relative group ${className}`} {...props}>
			{/* Vinyl Disc */}
			<div
				className={`
            ${styles.vinyl}
            rounded-full
            relative
            ${isSpinning ? 'animate-spin-slow' : ''}
          `}
				style={{ background: groovePattern }}
			>
				{/* Outer rim highlight */}
				<div
					className="absolute inset-0 rounded-full pointer-events-none"
					style={{
						boxShadow: `
                inset 0 0 0 1px rgba(255,255,255,0.05),
                inset 0 2px 4px rgba(255,255,255,0.03),
                0 4px 20px rgba(0,0,0,0.5),
                0 8px 40px rgba(0,0,0,0.3)
              `,
					}}
				/>

				{/* Primary shine/reflection */}
				<div
					className="absolute inset-0 rounded-full pointer-events-none"
					style={{
						background: `
                linear-gradient(
                  145deg,
                  ${colors.highlight} 0%,
                  transparent 40%,
                  transparent 60%,
                  rgba(0,0,0,0.2) 100%
                )
              `,
					}}
				/>

				{/* Secondary highlight arc */}
				<div
					className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
					style={{
						background: `
                conic-gradient(
                  from 200deg at 50% 50%,
                  transparent 0deg,
                  ${colors.highlight} 30deg,
                  transparent 60deg,
                  transparent 360deg
                )
              `,
					}}
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
            `}
					style={{
						boxShadow: `
                0 0 0 2px ${colors.groove},
                0 0 0 4px ${colors.base},
                inset 0 2px 4px rgba(0,0,0,0.3)
              `,
					}}
				>
					{coverUrl ? (
						<div className="relative w-full h-full">
							<Image src={coverUrl} alt={coverAlt} fill className="object-cover" />
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
						<div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary-400 to-primary-600">
							<span className="text-white font-bold drop-shadow-md">
								{fallbackText?.charAt(0).toUpperCase() || '♪'}
							</span>
						</div>
					)}
				</div>

				{/* Spindle Hole */}
				<div
					className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              ${styles.spindle}
              rounded-full
              bg-neutral-950
              z-10
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
                z-20
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
