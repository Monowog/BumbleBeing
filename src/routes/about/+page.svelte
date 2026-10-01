<script lang="ts">
	import { SOCIAL_LINKS } from '$lib/nav';
	import { Separator, Seo } from '$lib/components';

	// One page with three anchored sections rather than v1's three routes, all of
	// which were <span>Hello</span>.
	const sections = [
		{ id: 'education', title: 'Education' },
		{ id: 'experience', title: 'Experience' },
		{ id: 'hobbies', title: 'Hobbies' }
	];
</script>

<Seo
	title="About"
	description="Jackson Cmelak: education, experience, and what he does when not writing software."
/>

<div class="flex flex-col gap-10">
	<header class="flex flex-col gap-3">
		<h1 class="font-display text-3xl font-bold sm:text-4xl">About</h1>
		<nav aria-label="On this page" class="flex flex-wrap gap-4 text-sm">
			{#each sections as section (section.id)}
				<a href="#{section.id}" class="text-ink-muted underline-offset-4 hover:underline">
					{section.title}
				</a>
			{/each}
		</nav>
	</header>

	<section id="education" class="flex scroll-mt-20 flex-col gap-3">
		<h2 class="font-display text-2xl font-semibold">Education</h2>
		<p class="max-w-prose text-ink-muted">
			<!-- TODO: education -->
		</p>
	</section>

	<Separator />

	<section id="experience" class="flex scroll-mt-20 flex-col gap-3">
		<h2 class="font-display text-2xl font-semibold">Experience</h2>
		<p class="max-w-prose text-ink-muted">
			<!-- TODO: experience -->
		</p>
	</section>

	<Separator />

	<section id="hobbies" class="flex scroll-mt-20 flex-col gap-3">
		<h2 class="font-display text-2xl font-semibold">Hobbies</h2>
		<p class="max-w-prose text-ink-muted">
			<!-- TODO: hobbies -->
		</p>
	</section>

	<Separator />

	<section class="flex flex-col gap-3">
		<h2 class="font-display text-2xl font-semibold">Elsewhere</h2>
		<ul class="flex flex-wrap gap-4">
			{#each SOCIAL_LINKS as link (link.href)}
				<li>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a href={link.href} class="text-ink underline underline-offset-4">{link.label}</a>
				</li>
			{/each}
		</ul>
	</section>
</div>
