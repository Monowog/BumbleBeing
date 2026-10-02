<script lang="ts">
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
	<header class="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
		<h1 class="font-display text-3xl font-bold sm:text-4xl">About</h1>
		<nav
			aria-label="On this page"
			class="flex flex-wrap justify-center gap-4 text-sm sm:justify-start"
		>
			{#each sections as section (section.id)}
				<a href="#{section.id}" class="text-ink-muted underline-offset-4 hover:underline">
					{section.title}
				</a>
			{/each}
		</nav>
	</header>

	<section
		id="education"
		class="flex scroll-mt-20 flex-col items-center gap-3 text-center sm:items-start sm:text-left"
	>
		<h2 class="font-display text-2xl font-semibold">Education</h2>
		<p class="max-w-prose text-ink-muted">
			<!-- TODO: education -->
		</p>
	</section>

	<Separator />

	<section
		id="experience"
		class="flex scroll-mt-20 flex-col items-center gap-3 text-center sm:items-start sm:text-left"
	>
		<h2 class="font-display text-2xl font-semibold">Experience</h2>
		<p class="max-w-prose text-ink-muted">
			<!-- TODO: experience -->
		</p>
	</section>

	<Separator />

	<section
		id="hobbies"
		class="flex scroll-mt-20 flex-col items-center gap-3 text-center sm:items-start sm:text-left"
	>
		<h2 class="font-display text-2xl font-semibold">Hobbies</h2>
		<p class="max-w-prose text-ink-muted">
			<!-- TODO: hobbies -->
		</p>
	</section>
</div>
