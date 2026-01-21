'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
	{ href: '/', label: 'Feed', icon: 'home' },
	{ href: '/discover', label: 'Discover', icon: 'search' },
	{ href: '/create', label: 'Create', icon: 'plus' },
	{ href: '/profile', label: 'Profile', icon: 'user' },
] as const;

const icons: Record<string, React.ReactNode> = {
	home: (
		<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
			<polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	search: (
		<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	plus: (
		<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			<line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" strokeLinejoin="round" />
			<line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round" />
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
