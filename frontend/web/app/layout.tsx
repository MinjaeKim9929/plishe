import type { Metadata } from 'next';
import { Syne, Manrope } from 'next/font/google';
import './globals.css';

const syne = Syne({
	variable: '--font-syne',
	subsets: ['latin'],
});

const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Plishe',
	description:
		'A music-based social media platform where your taste in music becomes your social profile. Create playlists, share music, follow friends, and discover new sounds together.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${syne.variable} ${manrope.variable} antialiased bg-bg`}>{children}</body>
		</html>
	);
}
