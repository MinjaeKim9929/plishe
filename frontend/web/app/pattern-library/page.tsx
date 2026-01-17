import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

export default function PatternLibraryPage() {
	return (
		<div className="min-h-screen bg-bg p-8 md:p-12">
			<header className="mb-12">
				<h1 className="font-syne text-4xl font-extrabold text-text-primary">Pattern Library</h1>
				<p className="mt-2 text-text-secondary font-manrope">Plishe UI component reference</p>
			</header>

			{/* Buttons Section */}
			<section className="mb-20">
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

			{/* Inputs Section */}
			<section className="mb-20">
				<h2 className="font-syne text-2xl font-extrabold text-text-primary mb-6">Inputs</h2>

				{/* Variants */}
				<div className="mb-8">
					<h3 className="text-sm font-manrope font-medium text-text-secondary uppercase tracking-wider mb-4">
						Variants
					</h3>
					<div className="flex flex-col gap-4 max-w-sm">
						<Input variant="default" placeholder="Default input" />
						<Input variant="filled" placeholder="Filled input" />
					</div>
				</div>

				{/* Sizes */}
				<div className="mb-8">
					<h3 className="text-sm font-manrope font-medium text-text-secondary uppercase tracking-wider mb-4">Sizes</h3>
					<div className="flex flex-col gap-4 max-w-sm">
						<Input size="sm" placeholder="Small" />
						<Input size="md" placeholder="Medium" />
						<Input size="lg" placeholder="Large" />
					</div>
				</div>

				{/* With Label & Helper */}
				<div className="mb-8">
					<h3 className="text-sm font-manrope font-medium text-text-secondary uppercase tracking-wider mb-4">
						With Label & Helper
					</h3>
					<div className="flex flex-col gap-4 max-w-sm">
						<Input label="Email" type="email" placeholder="you@example.com" helperText="We'll never share your email" />
					</div>
				</div>

				{/* Required */}
				<div className="mb-8">
					<h3 className="text-sm font-manrope font-medium text-text-secondary uppercase tracking-wider mb-4">
						Required
					</h3>
					<div className="flex flex-col gap-4 max-w-sm">
						<Input label="Required Field" placeholder="This field is required" required />
					</div>
				</div>

				{/* Error State */}
				<div className="mb-8">
					<h3 className="text-sm font-manrope font-medium text-text-secondary uppercase tracking-wider mb-4">
						Error State
					</h3>
					<div className="flex flex-col gap-4 max-w-sm">
						<Input
							label="Username"
							placeholder="Enter username"
							error="Username is already taken"
							defaultValue="plishe"
						/>
					</div>
				</div>

				{/* With Icons */}
				<div className="mb-8">
					<h3 className="text-sm font-manrope font-medium text-text-secondary uppercase tracking-wider mb-4">
						With Icons
					</h3>
					<div className="flex flex-col gap-4 max-w-sm">
						<Input
							placeholder="Search tracks..."
							leftIcon={
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<circle cx="11" cy="11" r="8" />
									<path d="m21 21-4.35-4.35" />
								</svg>
							}
						/>
						<Input
							type="email"
							placeholder="Email"
							rightIcon={
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<rect width="20" height="16" x="2" y="4" rx="2" />
									<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
								</svg>
							}
						/>
					</div>
				</div>

				{/* Loading */}
				<div className="mb-8">
					<h3 className="text-sm font-manrope font-medium text-text-secondary uppercase tracking-wider mb-4">
						Loading
					</h3>
					<div className="flex flex-col gap-4 max-w-sm">
						<Input placeholder="Searching..." loading />
					</div>
				</div>

				{/* Clearable */}
				<div className="mb-8">
					<h3 className="text-sm font-manrope font-medium text-text-secondary uppercase tracking-wider mb-4">
						Clearable
					</h3>
					<div className="flex flex-col gap-4 max-w-sm">
						<Input placeholder="Type to see clear button" clearable defaultValue="Clear me" />
					</div>
				</div>

				{/* Character Count */}
				<div className="mb-8">
					<h3 className="text-sm font-manrope font-medium text-text-secondary uppercase tracking-wider mb-4">
						Character Count
					</h3>
					<div className="flex flex-col gap-4 max-w-sm">
						<Input
							label="Bio"
							placeholder="Tell us about yourself"
							maxLength={100}
							showCharacterCount
							defaultValue="Hello world"
						/>
					</div>
				</div>

				{/* Disabled */}
				<div className="mb-8">
					<h3 className="text-sm font-manrope font-medium text-text-secondary uppercase tracking-wider mb-4">
						Disabled
					</h3>
					<div className="max-w-sm">
						<Input disabled placeholder="Disabled input" defaultValue="Cannot edit" />
					</div>
				</div>

				{/* Combined */}
				<div>
					<h3 className="text-sm font-manrope font-medium text-text-secondary uppercase tracking-wider mb-4">
						Combined
					</h3>
					<div className="max-w-sm">
						<Input
							label="Username"
							placeholder="Choose a username"
							required
							clearable
							maxLength={20}
							showCharacterCount
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
