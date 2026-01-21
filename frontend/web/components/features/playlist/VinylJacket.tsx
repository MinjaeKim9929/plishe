'use client';

import Image from 'next/image';
import { type HTMLAttributes } from 'react';
import { Vinyl } from './Vinyl';

type JacketSize = 'sm' | 'md' | 'lg' | 'xl';
type JacketVariant = 'classic' | 'modern' | 'vintage' | 'interactive';

interface VinylJacketProps extends HTMLAttributes<HTMLDivElement> {
	variant?: JacketVariant;
	size?: JacketSize;
	coverUrl?: string;
	coverAlt?: string;
	title?: string;
	creator?: string;
	trackCount?: number;
	showInfo?: boolean;
	onClick?: () => void;
}

const sizeStyles: Record<
	JacketSize,
	{ wrapper: string; cover: string; title: string; meta: string; vinylSize: 'xs' | 'sm' | 'md' | 'lg' }
> = {
	sm: { wrapper: 'w-32', cover: 'aspect-square', title: 'text-sm', meta: 'text-xs', vinylSize: 'xs' },
	md: { wrapper: 'w-44', cover: 'aspect-square', title: 'text-base', meta: 'text-xs', vinylSize: 'sm' },
	lg: { wrapper: 'w-56', cover: 'aspect-square', title: 'text-lg', meta: 'text-sm', vinylSize: 'md' },
	xl: { wrapper: 'w-72', cover: 'aspect-square', title: 'text-xl', meta: 'text-sm', vinylSize: 'lg' },
};

// Noise texture SVG for vintage variant
const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

export function VinylJacket({
	variant = 'modern',
	size = 'md',
	coverUrl,
	coverAlt = 'Album cover',
	title,
	creator,
	trackCount,
	showInfo = true,
	onClick,
	className = '',
	...props
}: VinylJacketProps) {
	const styles = sizeStyles[size];

	// Classic variant: spine + gloss + layered shadows
	if (variant === 'classic') {
		return (
			<div className={`${styles.wrapper} flex flex-col gap-3 ${className}`} {...props}>
				<div
					onClick={onClick}
					onKeyDown={(e) => onClick && (e.key === 'Enter' || e.key === ' ') && onClick()}
					tabIndex={onClick ? 0 : undefined}
					role={onClick ? 'button' : undefined}
					className={`
						${styles.cover}
						relative
						rounded-md
						overflow-hidden
						bg-surface-elevated
						transition-all duration-200
						${onClick ? 'cursor-pointer hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-bg' : ''}
					`}
					style={{
						boxShadow: `
							2px 2px 4px rgba(0,0,0,0.3),
							4px 4px 8px rgba(0,0,0,0.2),
							6px 6px 16px rgba(0,0,0,0.15)
						`,
					}}
				>
					{/* Spine */}
					<div
						className="absolute left-0 top-0 bottom-0 w-1 z-10"
						style={{
							background: 'linear-gradient(to right, #0a0a0a 0%, #1a1a1a 50%, #262626 100%)',
						}}
					/>

					{/* Cover image */}
					{coverUrl ? (
						<Image src={coverUrl} alt={coverAlt} fill className="object-cover" draggable="false" />
					) : (
						<div></div>
					)}

					{/* Gloss overlay */}
					<div
						className="absolute inset-0 pointer-events-none"
						style={{
							background: `
								linear-gradient(
									135deg,
									rgba(255,255,255,0.2) 0%,
									rgba(255,255,255,0.05) 30%,
									transparent 50%,
									rgba(0,0,0,0.05) 70%,
									rgba(0,0,0,0.15) 100%
								)
							`,
						}}
					/>

					{/* Edge highlight */}
					<div
						className="absolute inset-0 pointer-events-none rounded-md"
						style={{
							boxShadow: `
								inset 1px 1px 0 rgba(255,255,255,0.1),
								inset -1px -1px 0 rgba(0,0,0,0.2)
							`,
						}}
					/>
				</div>

				{/* Info Section */}
				{showInfo && (title || creator) && (
					<div className="flex flex-col gap-0.5 px-1">
						{title && <h3 className={`${styles.title} font-semibold text-text-primary truncate`}>{title}</h3>}
						{(creator || trackCount !== undefined) && (
							<p className={`${styles.meta} text-text-muted truncate`}>
								{creator && `@${creator}`}
								{creator && trackCount !== undefined && ' · '}
								{trackCount !== undefined && `${trackCount} tracks`}
							</p>
						)}
					</div>
				)}
			</div>
		);
	}

	// Modern variant: clean + 3D tilt on hover
	if (variant === 'modern') {
		return (
			<div className={`${styles.wrapper} flex flex-col gap-3 ${className}`} {...props}>
				<div className="perspective-[1000px]">
					<div
						onClick={onClick}
						onKeyDown={(e) => onClick && (e.key === 'Enter' || e.key === ' ') && onClick()}
						tabIndex={onClick ? 0 : undefined}
						role={onClick ? 'button' : undefined}
						className={`
							${styles.cover}
							relative
							rounded-md
							overflow-hidden
							bg-surface-elevated
							border border-border-subtle
							shadow-md
							transition-all duration-300 ease-out
							${onClick ? 'cursor-pointer hover:transform-[rotateY(-5deg)_rotateX(3deg)] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-bg' : ''}
						`}
					>
						{coverUrl ? (
							<Image src={coverUrl} alt={coverAlt} fill className="object-cover" draggable="false" />
						) : (
							<div></div>
						)}

						{/* Subtle edge highlight */}
						<div
							className="absolute inset-0 pointer-events-none rounded-md"
							style={{
								boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)',
							}}
						/>
					</div>
				</div>

				{/* Info Section */}
				{showInfo && (title || creator) && (
					<div className="flex flex-col gap-0.5 px-1">
						{title && <h3 className={`${styles.title} font-semibold text-text-primary truncate`}>{title}</h3>}
						{(creator || trackCount !== undefined) && (
							<p className={`${styles.meta} text-text-muted truncate`}>
								{creator && `@${creator}`}
								{creator && trackCount !== undefined && ' · '}
								{trackCount !== undefined && `${trackCount} tracks`}
							</p>
						)}
					</div>
				)}
			</div>
		);
	}

	// Vintage variant: paper texture + vignette + sepia
	if (variant === 'vintage') {
		return (
			<div className={`${styles.wrapper} flex flex-col gap-3 ${className}`} {...props}>
				<div
					onClick={onClick}
					onKeyDown={(e) => onClick && (e.key === 'Enter' || e.key === ' ') && onClick()}
					tabIndex={onClick ? 0 : undefined}
					role={onClick ? 'button' : undefined}
					className={`
						${styles.cover}
						relative
						rounded-lg
						overflow-hidden
						bg-surface-elevated
						transition-all duration-200
						${onClick ? 'cursor-pointer hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-bg' : ''}
					`}
					style={{
						boxShadow: `
							inset 0 0 40px rgba(0,0,0,0.2),
							4px 4px 12px rgba(100, 80, 60, 0.3)
						`,
					}}
				>
					{coverUrl ? (
						<Image src={coverUrl} alt={coverAlt} fill className="object-cover" draggable="false" />
					) : (
						<div></div>
					)}

					{/* Sepia overlay */}
					<div
						className="absolute inset-0 pointer-events-none mix-blend-multiply"
						style={{
							background: 'rgba(180, 150, 110, 0.12)',
						}}
					/>

					{/* Corner vignette */}
					<div
						className="absolute inset-0 pointer-events-none"
						style={{
							background: `
								radial-gradient(
									ellipse at center,
									transparent 50%,
									rgba(0,0,0,0.25) 100%
								)
							`,
						}}
					/>

					{/* Paper texture overlay */}
					<div
						className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
						style={{
							backgroundImage: noiseTexture,
						}}
					/>

					{/* Worn edges */}
					<div
						className="absolute inset-0 pointer-events-none rounded-lg"
						style={{
							boxShadow: `
								inset 2px 2px 4px rgba(255,255,255,0.05),
								inset -2px -2px 4px rgba(0,0,0,0.15)
							`,
						}}
					/>
				</div>

				{/* Info Section */}
				{showInfo && (title || creator) && (
					<div className="flex flex-col gap-0.5 px-1">
						{title && <h3 className={`${styles.title} font-semibold text-text-primary truncate`}>{title}</h3>}
						{(creator || trackCount !== undefined) && (
							<p className={`${styles.meta} text-text-muted truncate`}>
								{creator && `@${creator}`}
								{creator && trackCount !== undefined && ' · '}
								{trackCount !== undefined && `${trackCount} tracks`}
							</p>
						)}
					</div>
				)}
			</div>
		);
	}

	// Interactive variant: stacked albums + vinyl peek
	if (variant === 'interactive') {
		return (
			<div className={`${styles.wrapper} flex flex-col gap-3 ${className}`} {...props}>
				<div className="relative group">
					{/* Back album 2 */}
					<div
						className="absolute inset-0 rounded-md bg-neutral-800 transition-transform duration-300 group-hover:-translate-y-1"
						style={{
							transform: 'translate(-6px, -6px)',
							zIndex: 1,
						}}
					/>

					{/* Back album 1 */}
					<div
						className="absolute inset-0 rounded-md bg-neutral-700 transition-transform duration-300 group-hover:-translate-y-0.5"
						style={{
							transform: 'translate(-3px, -3px)',
							zIndex: 2,
						}}
					/>

					{/* Front album */}
					<div
						onClick={onClick}
						onKeyDown={(e) => onClick && (e.key === 'Enter' || e.key === ' ') && onClick()}
						tabIndex={onClick ? 0 : undefined}
						role={onClick ? 'button' : undefined}
						className={`
							${styles.cover}
							relative
							rounded-md
							overflow-visible
							bg-surface-elevated
							shadow-lg
							transition-all duration-300
							z-10
							${onClick ? 'cursor-pointer group-hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-bg' : 'group-hover:-translate-y-0.5'}
						`}
					>
						<div className="relative w-full h-full rounded-md overflow-hidden">
							{coverUrl ? (
								<Image src={coverUrl} alt={coverAlt} fill className="object-cover" draggable="false" />
							) : (
								<div></div>
							)}

							{/* Subtle edge highlight */}
							<div
								className="absolute inset-0 pointer-events-none rounded-md"
								style={{
									boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
								}}
							/>
						</div>

						{/* Vinyl peek */}
						<div
							className="absolute top-1/2 -translate-y-1/2 right-0 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-[40%] group-focus-within:opacity-100 group-focus-within:translate-x-[40%]"
							style={{ zIndex: -1 }}
						>
							<Vinyl size={styles.vinylSize} coverUrl={coverUrl} isSpinning={false} />
						</div>
					</div>
				</div>

				{/* Info Section */}
				{showInfo && (title || creator) && (
					<div className="flex flex-col gap-0.5 px-1 mt-2">
						{title && <h3 className={`${styles.title} font-semibold text-text-primary truncate`}>{title}</h3>}
						{(creator || trackCount !== undefined) && (
							<p className={`${styles.meta} text-text-muted truncate`}>
								{creator && `@${creator}`}
								{creator && trackCount !== undefined && ' · '}
								{trackCount !== undefined && `${trackCount} tracks`}
							</p>
						)}
					</div>
				)}
			</div>
		);
	}

	// Fallback (should never reach here)
	return null;
}
