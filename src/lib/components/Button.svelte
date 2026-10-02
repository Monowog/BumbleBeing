<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Variant = 'primary' | 'outline' | 'ghost';
	type Size = 'sm' | 'md' | 'icon';

	interface Props {
		variant?: Variant;
		size?: Size;
		/** Renders an <a> instead of a <button>. */
		href?: string;
		class?: string;
		children: Snippet;
	}

	let {
		variant = 'outline',
		size = 'md',
		href,
		class: className,
		children,
		...rest
	}: Props & (HTMLButtonAttributes | HTMLAnchorAttributes) = $props();

	const base =
		'inline-flex items-center justify-center gap-2 rounded-md font-display font-medium shadow-soft ' +
		'transition-colors disabled:pointer-events-none disabled:opacity-50';

	const variants: Record<Variant, string> = {
		// Amber is the hover/active state, not the rest state — the theme decorates
		// the page, the primitives stay plain.
		primary: 'bg-primary text-primary-ink hover:bg-primary-hover',
		outline: 'border border-border bg-surface text-ink hover:bg-primary hover:text-primary-ink',
		ghost: 'text-ink hover:bg-surface'
	};

	const sizes: Record<Size, string> = {
		sm: 'h-8 px-3 text-sm',
		md: 'h-10 px-4',
		icon: 'size-10'
	};

	const classes = $derived(cn(base, variants[variant], sizes[size], className));
</script>

{#if href}
	<!--
		href may be an internal route or an external URL (a repo, LinkedIn, a PDF),
		so resolving it here would be wrong. Callers pass an already-resolved path.
	-->
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a {href} class={classes} {...rest as HTMLAnchorAttributes}>{@render children()}</a>
{:else}
	<button class={classes} {...rest as HTMLButtonAttributes}>{@render children()}</button>
{/if}
