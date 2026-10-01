<script lang="ts">
	import { Chip, Seo } from '$lib/components';

	let { data } = $props();
	const post = $derived(data.post);
	const Body = $derived(data.body);
</script>

<Seo title={post.title} description={post.blurb} type="article" publishedAt={post.date} />

<article class="flex flex-col gap-6">
	<header class="flex flex-col gap-3">
		<time datetime={post.date} class="text-sm text-ink-muted">{post.date}</time>
		<h1 class="font-display text-3xl font-bold sm:text-4xl">{post.title}</h1>
		{#if post.tags.length > 0}
			<div class="flex flex-wrap gap-2">
				{#each post.tags as tag (tag)}
					<Chip {tag} label={tag} />
				{/each}
			</div>
		{/if}
	</header>

	<div class="prose max-w-none text-ink prose-headings:font-display">
		{#if Body}
			<Body />
		{/if}
	</div>
</article>
