<script lang="ts">
	import { page } from '$app/state';
	import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL, absolute } from '$lib/site';

	interface Props {
		/** Page title. The site name is appended, except on the home page. */
		title?: string;
		description?: string;
		/** Set for article pages so social cards say "article" rather than "website". */
		type?: 'website' | 'article';
		publishedAt?: string;
	}

	let { title, description = SITE_DESCRIPTION, type = 'website', publishedAt }: Props = $props();

	const fullTitle = $derived(title ? `${title} · ${SITE_NAME}` : SITE_NAME);
	const canonical = $derived(absolute(page.url.pathname));
	const image = $derived(absolute(OG_IMAGE));
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	{#if publishedAt}
		<meta property="article:published_time" content={publishedAt} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>
