import { error } from '@sveltejs/kit';
import { postBody, postBySlug, posts } from '$lib/content';

export function entries() {
	return posts.map((post) => ({ slug: post.slug }));
}

export function load({ params }) {
	const post = postBySlug(params.slug);
	if (!post) error(404, `No post called "${params.slug}"`);
	return { post, body: postBody(params.slug) };
}
