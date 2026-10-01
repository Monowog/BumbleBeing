<script lang="ts">
	import { resolve } from '$app/paths';
	import { posts } from '$lib/content';
	import { Card, Chip, Seo } from '$lib/components';
</script>

<Seo title="Beelog" description="Notes on what Jackson is building, and why." />

<div class="flex flex-col gap-8">
	<header class="flex flex-col gap-2">
		<h1 class="font-display text-3xl font-bold sm:text-4xl">Beelog</h1>
		<p class="max-w-prose text-ink-muted">Notes on what I'm building, and why.</p>
	</header>

	{#if posts.length > 0}
		<div class="flex flex-col gap-4">
			{#each posts as post (post.slug)}
				<Card href={resolve('/blog/[slug]', { slug: post.slug })}>
					<time datetime={post.date} class="text-sm text-ink-muted">{post.date}</time>
					<h2 class="font-display text-xl font-semibold">{post.title}</h2>
					<p class="text-sm text-ink-muted">{post.blurb}</p>
					{#if post.tags.length > 0}
						<div class="flex flex-wrap gap-2">
							{#each post.tags as tag (tag)}
								<Chip {tag} label={tag} />
							{/each}
						</div>
					{/if}
				</Card>
			{/each}
		</div>
	{:else}
		<p class="text-ink-muted">No posts yet. Check back soon.</p>
	{/if}
</div>
