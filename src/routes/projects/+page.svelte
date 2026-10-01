<script lang="ts">
	import { projects } from '$lib/content';
	import { ProjectCard, Seo } from '$lib/components';
</script>

<Seo
	title="Projects"
	description="Machine learning, systems software and web applications Jackson Cmelak has built and written up."
/>

<div class="flex flex-col gap-8">
	<header class="flex flex-col gap-2">
		<h1 class="font-display text-3xl font-bold sm:text-4xl">Projects</h1>
		<!--
			Deliberately not "everything I've built": the roster is curated, and the
			index should not claim a completeness it does not have.
		-->
		<p class="max-w-prose text-ink-muted">
			A few things I've built and written up: machine learning, systems work, and the occasional web
			application.
		</p>
	</header>

	{#if projects.length > 0}
		<!-- No filter row: at this count it could only hide things from a reader who
		     can already see everything. -->
		<div class="grid gap-6 sm:grid-cols-2">
			{#each projects as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	{:else}
		<p class="text-ink-muted">Nothing here yet.</p>
	{/if}
</div>
