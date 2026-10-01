<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components';

	// Retired v1 URLs land here by design — /models, /about-me/* and three old
	// project pages have no redirects, so this page has to do the work.
	const isNotFound = $derived(page.status === 404);
</script>

<div class="flex flex-col items-center gap-6 py-16 text-center">
	<div
		aria-hidden="true"
		class="grid h-36 w-48 place-items-center rounded-md honeycomb text-primary [--c1:var(--background)] [--c2:var(--honeycomb-cell)] [--s:26px]"
	>
		<span class="font-display text-6xl font-bold">{page.status}</span>
	</div>

	<h1 class="font-display text-3xl">
		{isNotFound ? 'This cell is empty' : 'Something went wrong'}
	</h1>

	<p class="max-w-prose text-ink-muted">
		{#if isNotFound}
			Nothing lives at <code class="text-ink">{page.url.pathname}</code>.
		{:else}
			{page.error?.message ?? 'An unexpected error occurred.'}
		{/if}
	</p>

	<div class="flex flex-wrap items-center justify-center gap-3">
		<Button variant="primary" href={resolve('/projects')}>Browse projects</Button>
		<Button variant="outline" href={resolve('/')}>Back to the hive</Button>
	</div>
</div>
