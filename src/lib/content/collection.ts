import type { ZodType } from 'zod';

/** What `import.meta.glob('*.svx', { eager: true })` hands back per file. */
export interface ContentModule {
	metadata?: unknown;
	/** The compiled Svelte component for the Markdown body. */
	default?: unknown;
}

/** Filename (not path) to slug: `src/content/projects/booster-tutor.svx` -> `booster-tutor`. */
export function slugFromPath(path: string): string {
	const file = path.split('/').pop();
	if (!file) throw new Error(`Cannot derive a slug from "${path}"`);
	return file.replace(/\.svx$/, '');
}

/**
 * Validates a glob of .svx modules into typed, sorted entries.
 *
 * Frontmatter that does not match the schema throws **with the filename in the
 * message**, which is what turns a typo into a failed build rather than an
 * `undefined` rendered in production.
 */
export function loadCollection<T>(
	modules: Record<string, ContentModule>,
	schema: ZodType<T>
): Array<T & { slug: string }> {
	const entries = Object.entries(modules).map(([path, module]) => {
		const result = schema.safeParse(module.metadata);
		if (!result.success) {
			const issues = result.error.issues
				.map((issue) => `  ${issue.path.join('.') || '(root)'}: ${issue.message}`)
				.join('\n');
			throw new Error(`Invalid frontmatter in ${path}:\n${issues}`);
		}
		return { ...result.data, slug: slugFromPath(path) };
	});

	const seen = new Set<string>();
	for (const entry of entries) {
		if (seen.has(entry.slug)) throw new Error(`Duplicate slug "${entry.slug}"`);
		seen.add(entry.slug);
	}

	return entries;
}

/** Newest first. Posts are always read this way; Projects use it as their default. */
export function byDateDescending<T extends { date: string }>(entries: T[]): T[] {
	return [...entries].sort((a, b) => b.date.localeCompare(a.date));
}

/** Slug -> compiled body component, for rendering a single entry's prose. */
export function componentsBySlug(modules: Record<string, ContentModule>): Record<string, unknown> {
	const map: Record<string, unknown> = {};
	for (const [path, module] of Object.entries(modules)) {
		map[slugFromPath(path)] = module.default;
	}
	return map;
}
