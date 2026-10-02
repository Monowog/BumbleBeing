<script lang="ts">
	import { resolve } from '$app/paths';
	import { projects } from '$lib/content';
	import { Button, ProjectCard, Seo } from '$lib/components';

	// The home strip shows the three most recent; /projects shows everything.
	const featured = $derived(projects.slice(0, 3));
</script>

<Seo />

<div class="flex flex-col gap-12">
	<section class="py-8">
		<div class="flex flex-col gap-6 sm:flex-row sm:items-center">
			<!-- The ring is a masked parent showing through its own padding: a masked
				element cannot carry a border. `aspect-[0.866]` is the bounding ratio of a
				regular hexagon, so neither the shape nor the photo is stretched. -->
			<div class="aspect-[0.866] w-full shrink-0 bg-primary hex-clip p-2 sm:w-54 lg:w-60">
				<img
					src="/jackson-osaka-hex.jpg"
					alt="Jackson Cmelak on a rooftop in Osaka, the plaza and the setting sun behind him"
					width="1000"
					height="1155"
					fetchpriority="high"
					class="h-full w-full hex-clip object-cover"
				/>
			</div>
			<div class="flex flex-col items-start gap-4">
				<h1 class="font-display text-4xl font-bold sm:text-5xl">Welcome to the Hive</h1>
				<p class="max-w-prose text-lg">
					"Hi, I'm Jackson. I build machine learning models, systems software, and the occasional
					web application."
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
			</div>
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
