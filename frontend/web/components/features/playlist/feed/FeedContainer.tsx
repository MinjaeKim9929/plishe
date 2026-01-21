'use client';

import { useRef, useEffect, type ReactNode } from 'react';

interface FeedContainerProps {
	children: ReactNode;
	onEndReached?: () => void;
	onIndexChange?: (index: number) => void;
	className?: string;
}

export function FeedContainer({ children, onEndReached, onIndexChange, className = '' }: FeedContainerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const sentinelRef = useRef<HTMLDivElement>(null);

	// Intersection observer for infinite scroll
	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel || !onEndReached) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					onEndReached();
				}
			},
			{ threshold: 0, rootMargin: '200px' },
		);

		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [onEndReached]);

	// Track current index based on scroll position
	useEffect(() => {
		const container = containerRef.current;
		if (!container || !onIndexChange) return;

		const handleScroll = () => {
			const scrollTop = container.scrollTop;
			const itemHeight = container.clientHeight;
			const newIndex = Math.round(scrollTop / itemHeight);
			onIndexChange(newIndex);
		};

		container.addEventListener('scroll', handleScroll, { passive: true });
		return () => container.removeEventListener('scroll', handleScroll);
	}, [onIndexChange]);

	return (
		<div
			ref={containerRef}
			className={`
          h-dvh
          overflow-y-scroll
          snap-y snap-mandatory
          hide-scrollbar
          ${className}
        `}
		>
			{children}
			{/* Sentinel for infinite scroll */}
			<div ref={sentinelRef} className="h-1" aria-hidden="true" />
		</div>
	);
}
