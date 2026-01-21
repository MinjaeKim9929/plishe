'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
	{ href: '/', label: 'Groove', icon: 'home' },
	{ href: '/discover', label: 'Discover', icon: 'search' },
	{ href: '/create', label: 'Create', icon: 'plus' },
	{ href: '/my-stack', label: 'My Stack', icon: 'stacks' },
	{ href: '/profile', label: 'Profile', icon: 'user' },
] as const;

const icons: Record<string, React.ReactNode> = {
	home: (
		<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			<circle cx="12" cy="12" r="2" strokeLinecap="round" strokeLinejoin="round" />
			<circle cx="12" cy="12" r="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
			<circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
		</svg>
	),
	search: (
		<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			<circle cx="10" cy="10" r="6" />
			<path d="m21 21-6-6" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	plus: (
		<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			<line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" strokeLinejoin="round" />
			<line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	stacks: (
		<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			<rect
				x="4"
				y="3"
				width="3"
				height="18"
				rx="1"
				transform="rotate(15 6 10)"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect x="10" y="3" width="3" height="18" rx="1" strokeLinecap="round" strokeLinejoin="round" />
			<rect x="16" y="3" width="3" height="18" rx="1" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	user: (
		<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	),
};

export function Navbar() {
	const pathname = usePathname();

	return (
		<nav
			className="
          fixed bottom-0 left-0 right-0 z-50
          bg-surface/80 backdrop-blur-lg
          border-t border-border-subtle
          safe-area-bottom
        "
			role="navigation"
			aria-label="Main navigation"
		>
			<ul className="flex items-center justify-around max-w-lg mx-auto">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<li key={item.href}>
							<Link
								href={item.href}
								className={`
                    flex flex-col items-center gap-1 p-3 min-w-16
                    transition-colors duration-200
                    ${isActive ? 'text-primary-500' : 'text-text-muted hover:text-text-primary'}
                  `}
								aria-current={isActive ? 'page' : undefined}
							>
								{icons[item.icon]}
								<span className="text-xs font-medium">{item.label}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
