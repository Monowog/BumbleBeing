<script lang="ts">
	import '../app.css';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { BeeLayer, Footer, Header, HoneycombLayer } from '$lib/components';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<svelte:head>
	<!--
		The hive-cell mark, same artwork as the apple-touch-icon and the social card.
		The .ico carries 16/32/48/64 so the tab gets a size drawn for it rather than a
		downscaled 180px PNG.
	-->
	<link rel="icon" href="/favicon.ico" sizes="any" />
	<link rel="icon" type="image/png" href="/favicon-32.png" sizes="32x32" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>

<HoneycombLayer />
<BeeLayer />

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
		{@render children()}
	</main>
	<Footer />
</div>
