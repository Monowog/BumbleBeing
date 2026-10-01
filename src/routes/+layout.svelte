<script lang="ts">
	import '../app.css';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { BeeLayer, Footer, Header, HoneycombLayer } from '$lib/components';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<svelte:head>
	<!-- v1's bee mark, kept: people find a tab by its icon. -->
	<link rel="icon" href="/lucide-lab--bee.ico" sizes="any" />
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
