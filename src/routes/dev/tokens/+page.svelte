<script lang="ts">
	// Scaffolding, not a page. Deleted in Phase 8 (task 8.7).
	import { theme } from '$lib/state/theme.svelte';
	import { Button, Card, Chip, ImageStrip, PlaceholderTile, Separator } from '$lib/components';
	import { TAGS } from '$lib/content';

	const surfaces = [
		['--background', 'bg-background'],
		['--surface', 'bg-surface'],
		['--surface-raised', 'bg-surface-raised'],
		['--primary', 'bg-primary'],
		['--primary-hover', 'bg-primary-hover'],
		['--border', 'bg-border'],
		['--honeycomb-ground', 'bg-honeycomb-ground'],
		['--honeycomb-cell', 'bg-honeycomb-cell']
	];

	const chips: Array<{ tag: string; bg: string; fg: string }> = [
		{ tag: 'web', bg: 'bg-chip-web', fg: 'text-chip-web-fg' },
		{ tag: 'ml', bg: 'bg-chip-ml', fg: 'text-chip-ml-fg' },
		{ tag: 'systems', bg: 'bg-chip-systems', fg: 'text-chip-systems-fg' },
		{ tag: 'game', bg: 'bg-chip-game', fg: 'text-chip-game-fg' }
	];

	const weights = [300, 400, 500, 600, 700];
</script>

<div class="min-h-screen bg-background p-8 text-ink">
	<div class="mx-auto flex max-w-3xl flex-col gap-10">
		<header class="flex items-center justify-between gap-4">
			<div>
				<h1 class="text-3xl">Tokens</h1>
				<p class="text-ink-muted">
					Phase 1 scaffolding. Current theme: {theme.current}
				</p>
			</div>
			<button
				class="rounded-md border bg-surface px-4 py-2 font-medium hover:bg-primary hover:text-primary-ink"
				aria-pressed={theme.isDark}
				onclick={() => theme.toggle()}
			>
				Toggle theme
			</button>
		</header>

		<section class="flex flex-col gap-3">
			<h2 class="text-xl">Surfaces</h2>
			<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
				{#each surfaces as [name, cls] (name)}
					<div class="flex flex-col gap-1">
						<div class="h-16 rounded-md border {cls}"></div>
						<code class="text-xs text-ink-muted">{name}</code>
					</div>
				{/each}
			</div>
		</section>

		<section class="flex flex-col gap-3">
			<h2 class="text-xl">Tag chips</h2>
			<div class="flex flex-wrap gap-2">
				{#each chips as chip (chip.tag)}
					<span class="rounded-full px-3 py-1 text-sm font-medium {chip.bg} {chip.fg}">
						{chip.tag}
					</span>
				{/each}
			</div>
			<p class="text-sm text-ink-muted">
				<code>game</code> has no Projects yet and still has its pair.
			</p>
		</section>

		<section class="flex flex-col gap-3">
			<h2 class="text-xl">Type</h2>
			<div class="flex flex-col gap-2 rounded-md border bg-surface p-4">
				{#each weights as w (w)}
					<p class="font-display text-2xl" style="font-weight: {w}">
						Čmelák — Fredoka {w}
					</p>
				{/each}
				<p class="mt-2">Body copy is system-ui: the quick brown fox jumps over the lazy dog.</p>
				<p class="text-ink-muted">Muted body copy, same stack.</p>
			</div>
		</section>

		<section class="flex flex-col gap-3">
			<h2 class="text-xl">Buttons</h2>
			<div class="flex flex-wrap items-center gap-3">
				<Button variant="primary">Primary</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="outline" size="sm">Small</Button>
				<Button variant="outline" size="icon" aria-label="Icon button">★</Button>
				<Button variant="primary" href="/dev/tokens">As a link</Button>
				<Button variant="primary" disabled>Disabled</Button>
			</div>
			<p class="text-sm text-ink-muted">
				Tab through these: every one should show an amber focus ring.
			</p>
		</section>

		<section class="flex flex-col gap-3">
			<h2 class="text-xl">Cards and placeholder tiles</h2>
			<div class="grid gap-4 sm:grid-cols-2">
				<Card href="/dev/tokens">
					<PlaceholderTile title="BoosterTutor" tag="web" />
					<h3 class="text-lg">BoosterTutor</h3>
					<p class="text-sm text-ink-muted">
						Both of these start with B. The tint is what tells them apart.
					</p>
					<div class="flex flex-wrap gap-2"><Chip tag="web" label="web" /></div>
				</Card>
				<Card href="/dev/tokens">
					<PlaceholderTile title="Bone Fracture Detector" tag="ml" />
					<h3 class="text-lg">Bone Fracture Detector</h3>
					<p class="text-sm text-ink-muted">Same initial, different hue.</p>
					<div class="flex flex-wrap gap-2">
						<Chip tag="ml" label="ml" />
						<Chip label="PyTorch" />
					</div>
				</Card>
			</div>
		</section>

		<section class="flex flex-col gap-3">
			<h2 class="text-xl">Tiles, untagged and every tag</h2>
			<div class="grid grid-cols-2 gap-3 sm:grid-cols-5">
				<PlaceholderTile title="Untagged" />
				{#each TAGS as tag (tag)}
					<PlaceholderTile title={tag} {tag} />
				{/each}
			</div>
		</section>

		<section class="flex flex-col gap-3">
			<h2 class="text-xl">Separator</h2>
			<Separator />
			<div class="flex h-8 items-center gap-3">
				<span class="text-sm text-ink-muted">left</span>
				<Separator orientation="vertical" />
				<span class="text-sm text-ink-muted">right</span>
			</div>
		</section>

		<section class="flex flex-col gap-3">
			<h2 class="text-xl">Image strip</h2>
			<ImageStrip images={[]} title="Empty" />
			<p class="text-sm text-ink-muted">
				Nothing renders above: <code>images: []</code> is every Project's state until real screenshots
				exist, and an empty strip emits zero DOM nodes.
			</p>
		</section>

		<section class="flex flex-col gap-3">
			<h2 class="text-xl">Honeycomb delta</h2>
			<div class="flex overflow-hidden rounded-md border">
				<div class="h-20 flex-1 bg-honeycomb-ground"></div>
				<div class="h-20 flex-1 bg-honeycomb-cell"></div>
			</div>
			<p class="text-sm text-ink-muted">
				4.5% lightness apart. Should read as texture, not as a visible seam.
			</p>
		</section>
	</div>
</div>
