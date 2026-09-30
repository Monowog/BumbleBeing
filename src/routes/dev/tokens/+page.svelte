<script lang="ts">
	// Scaffolding, not a page. Deleted in Phase 8 (task 8.7).
	import { theme } from '$lib/state/theme.svelte';

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
