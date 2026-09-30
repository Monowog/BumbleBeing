<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { NAV_LINKS, isActive } from '$lib/nav';
	import { theme } from '$lib/state/theme.svelte';
	import { bees } from '$lib/state/bees.svelte';
	import { cn } from '$lib/utils';
	import BuzzLayer from './BuzzLayer.svelte';

	let open = $state(false);
	let trigger = $state<HTMLButtonElement | null>(null);

	// Any navigation closes the menu — otherwise it hangs over the new page. This
	// covers back/forward too, which a click handler on the links would miss.
	afterNavigate(() => {
		open = false;
	});

	function close(returnFocus = false) {
		open = false;
		if (returnFocus) trigger?.focus();
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) close(true);
	}

	const linkClasses = (href: string) =>
		cn(
			'rounded-md px-3 py-2 font-display font-medium transition-colors hover:bg-primary hover:text-primary-ink',
			isActive(page.url.pathname, href) && 'bg-surface text-ink underline underline-offset-4'
		);
</script>

<svelte:window onkeydown={onKeydown} />

<header class="relative sticky top-0 z-40 border-b border-border bg-surface">
	<BuzzLayer />
	<div class="relative z-10 mx-auto flex h-16 max-w-5xl items-center gap-2 px-4">
		<a href={resolve('/')} class="mr-auto font-display text-xl font-bold no-underline sm:text-2xl">
			BumbleBeing
		</a>

		<!-- Desktop nav. Hidden on small screens, where the disclosure below takes over. -->
		<nav aria-label="Main" class="hidden md:flex md:items-center md:gap-1">
			{#each NAV_LINKS as link (link.href)}
				<a
					data-buzz
					href={resolve(link.href)}
					class={linkClasses(link.href)}
					aria-current={isActive(page.url.pathname, link.href) ? 'page' : undefined}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<button
			data-buzz
			type="button"
			onclick={() => theme.toggle()}
			aria-pressed={theme.isDark}
			class="inline-flex size-10 items-center justify-center rounded-md hover:bg-primary hover:text-primary-ink"
		>
			<span class="sr-only">Dark theme</span>
			{#if theme.isDark}
				<svg viewBox="0 0 24 24" class="size-5" fill="currentColor" aria-hidden="true">
					<path d="M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10Z" />
				</svg>
			{:else}
				<svg
					viewBox="0 0 24 24"
					class="size-5"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="4" />
					<path
						d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
					/>
				</svg>
			{/if}
		</button>

		<button
			data-buzz
			type="button"
			onclick={() => bees.toggle()}
			aria-pressed={bees.active}
			class="inline-flex size-10 items-center justify-center rounded-md hover:bg-primary hover:text-primary-ink"
		>
			<span class="sr-only">Flying bees</span>
			<svg
				viewBox="0 0 24 24"
				class="size-5"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				aria-hidden="true"
			>
				<path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
				<path d="M12 8.5 8 10.75v4.5L12 17.5l4-2.25v-4.5L12 8.5Z" />
				{#if !bees.active}
					<path d="M4 4l16 16" />
				{/if}
			</svg>
		</button>

		<!--
			Mobile disclosure. Deliberately not a modal: no focus trap, no overlay,
			no inert background. Four links do not warrant one (ADR 0002).
		-->
		<button
			data-buzz
			bind:this={trigger}
			type="button"
			onclick={() => (open = !open)}
			aria-expanded={open}
			aria-controls="mobile-nav"
			class="inline-flex size-10 items-center justify-center rounded-md hover:bg-primary hover:text-primary-ink md:hidden"
		>
			<span class="sr-only">Menu</span>
			<svg
				viewBox="0 0 24 24"
				class="size-5"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				aria-hidden="true"
			>
				{#if open}
					<path d="M6 6l12 12M18 6 6 18" />
				{:else}
					<path d="M4 7h16M4 12h16M4 17h16" />
				{/if}
			</svg>
		</button>
	</div>

	<nav
		id="mobile-nav"
		aria-label="Main"
		hidden={!open}
		class="border-t border-border bg-surface md:hidden"
	>
		<ul class="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3">
			{#each NAV_LINKS as link (link.href)}
				<li>
					<a
						href={resolve(link.href)}
						class={cn(linkClasses(link.href), 'block')}
						aria-current={isActive(page.url.pathname, link.href) ? 'page' : undefined}
						onclick={() => close()}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
