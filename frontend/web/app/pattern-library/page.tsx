import { Button } from '@/components/common/Button';

export default function PatternLibraryPage() {
	return (
		<div className="min-h-screen bg-bg p-8 md:p-12">
			<header className="mb-12">
				<h1 className="font-syne text-4xl font-extrabold text-text-primary">Pattern Library</h1>
				<p className="mt-2 text-secondary-text font-manrope">Plishe UI component reference</p>
			</header>

			{/* Buttons Section */}
			<section className="mb-16">
				<h2 className="font-syne text-2xl font-extrabold text-text-primary mb-6">Buttons</h2>

				{/* Variants */}
				<div className="mb-8">
					<h3 className="text-sm font-manrope font-medium text-text-secondary uppercase tracking-wider mb-4">
						Variants
					</h3>
					<div className="flex flex-wrap gap-4">
						<Button variant="primary">Primary</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="danger">Danger</Button>
						<Button variant="link">Link</Button>
					</div>
				</div>

				{/* Sizes */}
				<div className="mb-8">
					<h3 className="text-sm font-manrope font-medium text-text-secondary uppercase tracking-wider mb-4">Sizes</h3>
					<div className="flex flex-wrap items-center gap-4">
						<Button size="sm">Small</Button>
						<Button size="md">Medium</Button>
						<Button size="lg">Large</Button>
						<Button size="xl">X-Large</Button>
					</div>
				</div>

				{/* States */}
				<div className="mb-8">
					<h3 className="text-sm font-manrope font-medium text-text-secondary uppercase tracking-wider mb-4">States</h3>
					<div className="flex flex-wrap items-center gap-4">
						<Button disabled>Disabled</Button>
						<Button loading>Loading</Button>
						<Button variant="secondary" disabled>
							Disabled Secondary
						</Button>
						<Button variant="secondary" loading>
							Loading Secondary
						</Button>
					</div>
				</div>

				{/* Full Width */}
				<div>
					<h3 className="text-sm font-manrope font-medium text-text-secondary uppercase tracking-wider mb-4">
						Full Width
					</h3>
					<div className="max-w-md">
						<Button fullWidth>Full Width Button</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
