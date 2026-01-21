import { Navbar } from '@/components/layout/Navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-bg">
			{/* Main content area - account for bottom navbar */}
			<main className="pb-20">{children}</main>
			<Navbar />
		</div>
	);
}
