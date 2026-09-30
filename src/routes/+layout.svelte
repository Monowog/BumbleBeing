<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { BeeLayer, Footer, Header, HoneycombLayer } from '$lib/components';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<HoneycombLayer />
<BeeLayer />

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
		{@render children()}
	</main>
	<Footer />
</div>
