<script lang="ts">
	import type { Tag } from '$lib/content';
	import { cn } from '$lib/utils';

	interface Props {
		title: string;
		/** Drives the tint, so the grid shows at a glance which Projects are ML. */
		tag?: Tag;
		class?: string;
	}

	let { title, tag, class: className }: Props = $props();

	const initial = $derived(title.trim().charAt(0).toUpperCase() || '?');

	// Tinting by Tag is what separates BoosterTutor from Bone Fracture Detector:
	// both are "B", and hue carries the information a letter cannot.
	const tints: Record<Tag, string> = {
		game: 'text-chip-game-fg [--tile-ink:var(--chip-game-fg)] [--tile-ground:var(--chip-game)]',
		ml: 'text-chip-ml-fg [--tile-ink:var(--chip-ml-fg)] [--tile-ground:var(--chip-ml)]',
		systems:
			'text-chip-systems-fg [--tile-ink:var(--chip-systems-fg)] [--tile-ground:var(--chip-systems)]',
		web: 'text-chip-web-fg [--tile-ink:var(--chip-web-fg)] [--tile-ground:var(--chip-web)]'
	};

	const tint = $derived(
		tag ? tints[tag] : 'text-ink-muted [--tile-ink:var(--ink-muted)] [--tile-ground:var(--surface)]'
	);
</script>

<!--
	A deliberate stand-in, not a broken image: a honeycomb tile carrying the
	project's initial. Decorative, so it is hidden from assistive tech — the
	Card's own title is the accessible name.
-->
<div
	aria-hidden="true"
	class={cn(
		'honeycomb-tile flex aspect-video w-full items-center justify-center rounded-md',
		tint,
		className
	)}
>
	<span class="font-display text-5xl font-bold opacity-70">{initial}</span>
</div>

<style>
	.honeycomb-tile {
		--s: 22px;
		--c1: var(--tile-ground);
		--c2: color-mix(in oklab, var(--tile-ink) 12%, var(--tile-ground));
		--c: #0000, var(--c1) 0.5deg 119.5deg, #0000 120deg;
		--g1: conic-gradient(from 60deg at 56.25% calc(425% / 6), var(--c));
		--g2: conic-gradient(from 180deg at 43.75% calc(425% / 6), var(--c));
		--g3: conic-gradient(from -60deg at 50% calc(175% / 12), var(--c));
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
