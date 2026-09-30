import { loadCollection, byDateDescending, type ContentModule } from './collection';
import { projectSchema, postSchema, type Project, type Post } from './schema';

// Eager and relative so the glob is resolved at build time: every page that needs
// content gets it without a fetch, and the whole site stays prerenderable.
const projectModules = import.meta.glob<ContentModule>('../../content/projects/*.svx', {
	eager: true
});
const postModules = import.meta.glob<ContentModule>('../../content/posts/*.svx', { eager: true });

export const projects: Project[] = byDateDescending(loadCollection(projectModules, projectSchema));
export const posts: Post[] = byDateDescending(loadCollection(postModules, postSchema));

export function projectBySlug(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
}

export function postBySlug(slug: string): Post | undefined {
	return posts.find((post) => post.slug === slug);
}

export type { Project, Post };
export { TAGS, type Tag } from './schema';
