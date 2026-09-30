import { error } from '@sveltejs/kit';
import { projectBody, projectBySlug, projects } from '$lib/content';

/** Tells the prerenderer which slugs exist, so it never has to crawl for them. */
export function entries() {
	return projects.map((project) => ({ slug: project.slug }));
}

export function load({ params }) {
	const project = projectBySlug(params.slug);
	if (!project) error(404, `No project called "${params.slug}"`);
	return { project, body: projectBody(params.slug) };
}
