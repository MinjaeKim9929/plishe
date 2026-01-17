'use client';

import { useState } from 'react';

import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

type ThemeMode = 'light' | 'dark' | 'system';

function ThemeToggle({ mode, onChange }: { mode: ThemeMode; onChange: (mode: ThemeMode) => void }) {
	return (
		<div className="inline-flex rounded-lg bg-surface p-1 border border-border">
			{(['light', 'dark', 'system'] as const).map((m) => (
				<button
					key={m}
					onClick={() => onChange(m)}
					className={`
						px-3 py-1.5 text-sm font-medium rounded-md transition-colors hover:cursor-pointer
						${mode === m ? 'bg-primary-500 text-white' : 'text-text-secondary hover:text-text-primary'}`}
				>
					{m.charAt(0).toUpperCase() + m.slice(1)}
				</button>
			))}
		</div>
	);
}

function ComponentCard({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="rounded-xl border border-border bg-surface p-6">
			<h2 className="font-syne text-xl font-bold text-text-primary mb-6">{title}</h2>
			{children}
		</div>
	);
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="mb-6 last:mb-0">
			<h3 className="text-xs font-manrope font-semibold text-text-muted uppercase tracking-wider mb-3">{title}</h3>
			{children}
		</div>
	);
}

export default function PatternLibraryPage() {
	const [theme, setTheme] = useState<ThemeMode>('system');

	const themeClass = theme === 'light' ? 'light-theme' : theme === 'dark' ? 'dark-theme' : '';

	return (
		<div className={`min-h-screen bg-bg ${themeClass}`}>
			{/* Header */}
			<header className="sticky top-0 z-10 bg-bg/80 backdrop-blur-sm border-b border-border">
				<div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
					<div>
						<h1 className="font-syne text-2xl font-extrabold text-text-primary">Pattern Library</h1>
						<p className="text-sm text-text-muted">Plishe UI Components</p>
					</div>
					<ThemeToggle mode={theme} onChange={setTheme} />
				</div>
			</header>

			{/* Content */}
			<main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
				{/* Buttons */}
				<ComponentCard title="Button">
					<Subsection title="Variants × Sizes">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="text-left text-xs text-text-muted uppercase">
										<th className="pb-3 pr-4 font-medium"></th>
										<th className="pb-3 px-2 font-medium">SM</th>
										<th className="pb-3 px-2 font-medium">MD</th>
										<th className="pb-3 px-2 font-medium">LG</th>
										<th className="pb-3 px-2 font-medium">XL</th>
									</tr>
								</thead>
								<tbody className="align-middle">
									{(['primary', 'secondary', 'ghost', 'danger', 'link'] as const).map((variant) => (
										<tr key={variant} className="border-t border-border-subtle">
											<td className="py-4 pr-4 text-sm text-text-secondary capitalize">{variant}</td>
											{(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
												<td key={size} className="py-4 px-2">
													<Button variant={variant} size={size}>
														Button
													</Button>
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</Subsection>

					<Subsection title="States">
						<div className="flex flex-wrap gap-4">
							<div className="space-y-2">
								<p className="text-xs text-text-muted">Normal</p>
								<Button>Default</Button>
							</div>
							<div className="space-y-2">
								<p className="text-xs text-text-muted">Disabled</p>
								<Button disabled>Disabled</Button>
							</div>
							<div className="space-y-2">
								<p className="text-xs text-text-muted">Loading</p>
								<Button loading>Loading</Button>
							</div>
						</div>
					</Subsection>

					<Subsection title="Full Width">
						<div className="max-w-md">
							<Button fullWidth>Full Width Button</Button>
						</div>
					</Subsection>
				</ComponentCard>

				{/* Inputs */}
				<ComponentCard title="Input">
					<div className="grid md:grid-cols-2 gap-8">
						{/* Left column */}
						<div className="space-y-6">
							<Subsection title="Variants">
								<div className="space-y-3">
									<Input variant="default" placeholder="Default variant" />
									<Input variant="filled" placeholder="Filled variant" />
								</div>
							</Subsection>

							<Subsection title="Sizes">
								<div className="space-y-3">
									<Input size="sm" placeholder="Small" />
									<Input size="md" placeholder="Medium" />
									<Input size="lg" placeholder="Large" />
								</div>
							</Subsection>

							<Subsection title="With Label & Helper">
								<Input
									label="Email"
									type="email"
									placeholder="you@example.com"
									helperText="We'll never share your email"
								/>
							</Subsection>
						</div>

						{/* Right column */}
						<div className="space-y-6">
							<Subsection title="States">
								<div className="space-y-3">
									<Input label="Required" placeholder="Required field" required />
									<Input
										label="Error"
										placeholder="With error"
										error="This field has an error"
										defaultValue="Invalid value"
									/>
									<Input placeholder="Disabled" disabled defaultValue="Cannot edit" />
									<Input placeholder="Loading..." loading />
								</div>
							</Subsection>

							<Subsection title="Features">
								<div className="space-y-3">
									<Input
										placeholder="Search..."
										leftIcon={
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
												<circle cx="11" cy="11" r="8" />
												<path d="m21 21-4.35-4.35" />
											</svg>
										}
									/>
									<Input placeholder="Clearable" clearable defaultValue="Clear me" />
									<Input label="Character limit" placeholder="Type here..." maxLength={50} showCharacterCount />
								</div>
							</Subsection>
						</div>
					</div>
				</ComponentCard>
			</main>
		</div>
	);
}
