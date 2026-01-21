'use client';

import { useState } from 'react';

import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Vinyl, VinylJacket } from '@/components/features/playlist';

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

				{/* Vinyl */}
				<ComponentCard title="Vinyl">
					<Subsection title="Sizes">
						<div className="flex items-end gap-6">
							<Vinyl size="xs" />
							<Vinyl size="sm" />
							<Vinyl size="md" />
							<Vinyl size="lg" />
							<Vinyl size="xl" />
						</div>
					</Subsection>

					<Subsection title="With Cover">
						<div className="flex items-center gap-6">
							<Vinyl size="md" coverUrl="https://picsum.photos/200" coverAlt="Album 1" />
							<Vinyl size="md" color="red" coverUrl="https://picsum.photos/201" coverAlt="Album 2" />
							<Vinyl size="md" color="gold" coverUrl="https://picsum.photos/202" coverAlt="Album 3" />
						</div>
					</Subsection>

					<Subsection title="States">
						<div className="flex items-center gap-8">
							<div className="space-y-2 text-center">
								<Vinyl size="md" coverUrl="https://picsum.photos/203" />
								<p className="text-xs text-text-muted">Static</p>
							</div>
							<div className="space-y-2 text-center">
								<Vinyl size="md" coverUrl="https://picsum.photos/204" isSpinning />
								<p className="text-xs text-text-muted">Spinning</p>
							</div>
							<div className="space-y-2 text-center">
								<Vinyl size="md" coverUrl="https://picsum.photos/205" showPlayButton onPlay={() => {}} />
								<p className="text-xs text-text-muted">Hover for Play</p>
							</div>
						</div>
					</Subsection>
				</ComponentCard>

				{/* Vinyl Jacket */}
				<ComponentCard title="Vinyl Jacket">
					<Subsection title="Variants">
						<div className="flex items-end gap-8">
							<div className="text-center">
								<VinylJacket
									variant="classic"
									size="md"
									coverUrl="https://picsum.photos/223"
									title="Classic"
									creator="vinyl_store"
									trackCount={12}
								/>
								<p className="text-xs text-text-muted mt-2">Classic</p>
							</div>
							<div className="text-center">
								<VinylJacket
									variant="modern"
									size="md"
									coverUrl="https://picsum.photos/224"
									title="Modern"
									creator="minimalist"
									trackCount={8}
								/>
								<p className="text-xs text-text-muted mt-2">Modern</p>
							</div>
							<div className="text-center">
								<VinylJacket
									variant="vintage"
									size="md"
									coverUrl="https://picsum.photos/225"
									title="Vintage"
									creator="retro_vibes"
									trackCount={15}
								/>
								<p className="text-xs text-text-muted mt-2">Vintage</p>
							</div>
							<div className="text-center">
								<VinylJacket
									variant="interactive"
									size="md"
									coverUrl="https://picsum.photos/226"
									title="Interactive"
									creator="collector"
									trackCount={24}
								/>
								<p className="text-xs text-text-muted mt-2">Interactive (hover)</p>
							</div>
						</div>
					</Subsection>

					<Subsection title="Sizes">
						<div className="flex items-end gap-6">
							<VinylJacket
								variant="classic"
								size="sm"
								coverUrl="https://picsum.photos/200"
								title="Small"
								creator="user"
								trackCount={10}
							/>
							<VinylJacket
								variant="classic"
								size="md"
								coverUrl="https://picsum.photos/201"
								title="Medium Size"
								creator="username"
								trackCount={24}
							/>
							<VinylJacket
								variant="classic"
								size="lg"
								coverUrl="https://picsum.photos/202"
								title="Large Jacket"
								creator="creator"
								trackCount={48}
							/>
							<VinylJacket
								variant="classic"
								size="xl"
								coverUrl="https://picsum.photos/203"
								title="Extra Large"
								creator="artist"
								trackCount={100}
							/>
						</div>
					</Subsection>

					<Subsection title="States">
						<div className="flex items-end gap-6">
							<VinylJacket
								variant="modern"
								size="md"
								coverUrl="https://picsum.photos/204"
								title="With Cover"
								creator="user"
								trackCount={12}
							/>
							<VinylJacket variant="modern" size="md" title="No Cover" creator="user" trackCount={8} />
							<VinylJacket variant="modern" size="md" coverUrl="https://picsum.photos/205" showInfo={false} />
							<VinylJacket
								variant="modern"
								size="md"
								coverUrl="https://picsum.photos/206"
								title="Clickable"
								creator="user"
								onClick={() => {}}
							/>
						</div>
					</Subsection>
				</ComponentCard>
			</main>
		</div>
	);
}
