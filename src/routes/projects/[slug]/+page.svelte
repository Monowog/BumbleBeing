<script lang="ts">
	import { Button, Chip, ImageStrip, Seo } from '$lib/components';

	let { data } = $props();
	const project = $derived(data.project);
	const Body = $derived(data.body);
</script>

<Seo title={project.title} description={project.blurb} type="article" publishedAt={project.date} />

<article class="flex flex-col gap-6">
	<header class="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
		<h1 class="font-display text-3xl font-bold sm:text-4xl">{project.title}</h1>

		<div class="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
			{#each project.tags as tag (tag)}
				<Chip {tag} label={tag} />
			{/each}
			{#each project.tools as tool (tool)}
				<Chip label={tool} />
			{/each}
		</div>

		{#if project.credit}
			<p class="text-sm text-ink-muted italic">{project.credit}</p>
		{/if}

		<div class="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
			{#if project.repo}
				<Button variant="outline" size="sm" href={project.repo}>Source</Button>
			{:else}
				<!--
					An explicit statement rather than a gap. A blank space where every
					other project has a link reads as an oversight; this reads as a normal
					fact about professional work.
				-->
				<span class="rounded-md border border-border px-3 py-1 text-sm text-ink-muted">
					Private repository
				</span>
			{/if}
			{#if project.demo}
				<Button variant="outline" size="sm" href={project.demo}>Live demo</Button>
			{/if}
			{#if project.report}
				<Button variant="outline" size="sm" href={project.report}>Report (PDF)</Button>
			{/if}
		</div>
	</header>

	<!--
		The body's first paragraph lands above the gallery on purpose: the page should
		open with what the project is, not with an unlabelled screenshot.
	-->
	<div class="prose max-w-none text-ink prose-headings:font-display">
		{#if Body}
			<Body />
		{/if}
	</div>

	<ImageStrip images={project.images} title={project.title} />
</article>
