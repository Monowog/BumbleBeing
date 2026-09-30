<script lang="ts">
	import { SOCIAL_LINKS } from '$lib/nav';
</script>

<!-- Where the old sidebar's navSecondary went, and where a reader looks for a résumé. -->
<footer class="mt-16 border-t border-border bg-surface">
	<div
		class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm sm:flex-row"
	>
		<p class="text-ink-muted">© {new Date().getFullYear()} Jackson Cmelak</p>
		<ul class="flex flex-wrap items-center justify-center gap-4">
			{#each SOCIAL_LINKS as link (link.href)}
				<li>
					<!--
						A PDF in static/ and two external profiles: nothing here is an
						internal route, so resolve() does not apply.
					-->
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a href={link.href} class="text-ink underline-offset-4 hover:underline">
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</footer>
