<script lang="ts">
	import type { Tag } from '$lib/content';
	import { cn } from '$lib/utils';

	interface Props {
		/** A Tag renders in its own colour pair; anything else is a neutral Tool chip. */
		tag?: Tag;
		label: string;
		class?: string;
	}

	let { tag, label, class: className }: Props = $props();

	// Written out rather than interpolated so Tailwind's scanner can see each class.
	const tagClasses: Record<Tag, string> = {
		game: 'bg-chip-game text-chip-game-fg',
		ml: 'bg-chip-ml text-chip-ml-fg',
		systems: 'bg-chip-systems text-chip-systems-fg',
		web: 'bg-chip-web text-chip-web-fg'
	};

	const classes = $derived(
		cn(
			'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
			tag ? tagClasses[tag] : 'border border-border text-ink-muted',
			className
		)
	);
</script>

<span class={classes}>{label}</span>
