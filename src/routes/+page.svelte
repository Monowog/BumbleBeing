<script lang="ts">
	import { resolve } from '$app/paths';
	import { projects } from '$lib/content';
	import { Button, ProjectCard, Seo } from '$lib/components';

	// The home strip shows the three most recent; /projects shows everything.
	const featured = $derived(projects.slice(0, 3));
</script>

<Seo />

<div class="flex flex-col gap-12">
	<section class="flex flex-col items-start gap-4 py-8">
		<h1 class="font-display text-4xl font-bold sm:text-5xl">BumbleBeing</h1>
		<p class="max-w-prose text-lg">
			I'm Jackson Cmelak — I build machine learning models, systems software, and the occasional web
			application.
		</p>
		<!-- The best copy on v1, and the reason the site is called what it is. -->
		<p class="max-w-prose text-ink-muted">
			<span class="font-display font-medium text-ink">Čmelák</span>
			<span class="italic">(tschmeh-lahk)</span>: the Czech word for bumblebee.
		</p>
		<div class="flex flex-wrap gap-3 pt-2">
			<Button variant="primary" href={resolve('/projects')}>View projects</Button>
			<Button variant="outline" href="/JacksonCmelakResume.pdf">Résumé</Button>
		</div>
	</section>

	{#if featured.length > 0}
		<section class="flex flex-col gap-6">
			<div class="flex items-baseline justify-between gap-4">
				<h2 class="font-display text-2xl font-semibold">Recent work</h2>
				<a
					href={resolve('/projects')}
					class="text-sm text-ink-muted underline-offset-4 hover:underline"
				>
					All projects
				</a>
			</div>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each featured as project (project.slug)}
					<ProjectCard {project} />
				{/each}
			</div>
		</section>
	{/if}
</div>
