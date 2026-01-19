import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'picsum.photos' },
			{ protocol: 'https', hostname: 'i.pravatar.cc' },
			{ protocol: 'https', hostname: '*.supabase.co' },
			{ protocol: 'https', hostname: 'i.scdn.co' }, // Spotify
			{ protocol: 'https', hostname: '*.mzstatic.com' },
		],
	},
};

export default nextConfig;
