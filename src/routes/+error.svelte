<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components';

	// Retired v1 URLs land here by design — /models, /about-me/* and three old
	// project pages have no redirects, so this page has to do the work.
	const isNotFound = $derived(page.status === 404);
</script>

<div class="flex flex-col items-center gap-6 py-16 text-center">
	<div class="honeycomb-mark" aria-hidden="true">
		<span class="font-display text-6xl font-bold">{page.status}</span>
	</div>

	<h1 class="font-display text-3xl">
		{isNotFound ? 'This cell is empty' : 'Something went wrong'}
	</h1>

	<p class="max-w-prose text-ink-muted">
		{#if isNotFound}
			Nothing lives at <code class="text-ink">{page.url.pathname}</code>. The hive was rebuilt and a
			few old rooms did not survive the move.
		{:else}
			{page.error?.message ?? 'An unexpected error occurred.'}
		{/if}
	</p>

	<div class="flex flex-wrap items-center justify-center gap-3">
		<Button variant="primary" href={resolve('/projects')}>Browse projects</Button>
		<Button variant="outline" href={resolve('/')}>Back to the hive</Button>
	</div>
</div>

<style>
	.honeycomb-mark {
		--s: 26px;
		--c1: var(--background);
		--c2: var(--honeycomb-cell);
		--c: #0000, var(--c1) 0.5deg 119.5deg, #0000 120deg;
		--g1: conic-gradient(from 60deg at 56.25% calc(425% / 6), var(--c));
		--g2: conic-gradient(from 180deg at 43.75% calc(425% / 6), var(--c));
		--g3: conic-gradient(from -60deg at 50% calc(175% / 12), var(--c));
		display: grid;
		place-items: center;
		width: 12rem;
		height: 9rem;
		border-radius: var(--radius);
		color: var(--primary);
		background:
			var(--g1),
			var(--g1) var(--s) calc(1.73 * var(--s)),
			var(--g2),
			var(--g2) var(--s) calc(1.73 * var(--s)),
			var(--g3) var(--s) 0,
			var(--g3) 0 calc(1.73 * var(--s)) var(--c2);
		background-size: calc(2 * var(--s)) calc(3.46 * var(--s));
	}
</style>
