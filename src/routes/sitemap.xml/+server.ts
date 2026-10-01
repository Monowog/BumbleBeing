import { posts, projects } from '$lib/content';
import { absolute } from '$lib/site';

export const prerender = true;

/** Static routes worth indexing. /dev/* is scaffolding and never listed. */
const STATIC_PATHS = ['/', '/projects', '/about', '/blog'];

export function GET() {
	const entries = [
		...STATIC_PATHS.map((path) => ({ path, lastmod: undefined as string | undefined })),
		...projects.map((p) => ({ path: `/projects/${p.slug}`, lastmod: p.date })),
		...posts.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.date }))
	];

	const urls = entries
		.map(({ path, lastmod }) =>
			[
				'\t<url>',
				`\t\t<loc>${absolute(path)}</loc>`,
				lastmod ? `\t\t<lastmod>${lastmod}</lastmod>` : null,
				'\t</url>'
			]
				.filter(Boolean)
				.join('\n')
		)
		.join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
		{ headers: { 'Content-Type': 'application/xml' } }
	);
}
