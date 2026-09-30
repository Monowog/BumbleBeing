import { z } from 'zod';

/**
 * The closed Tag set. Closed because every member needs a chip colour pair in
 * app.css — an open set means an unstyled chip and a typo silently splitting a
 * facet. `game` has no Projects yet and ships anyway (see ADR 0001).
 */
export const TAGS = ['game', 'ml', 'systems', 'web'] as const;
export type Tag = (typeof TAGS)[number];

/**
 * `2026-09-30`, kept as a string: it is display data, never arithmetic.
 *
 * An author may reasonably write the date three different ways, and all three
 * reach us differently:
 *   date: 2026-09-30    YAML parses it to a Date, which mdsvex then serialises
 *                       into the compiled module as "2026-09-30T00:00:00.000Z"
 *   date: '2026-09-30'  arrives verbatim
 *   (a real Date)       from any loader that does not round-trip through mdsvex
 *
 * Normalising all three here means nobody has to remember to quote the date, and
 * nobody has to decode an error about a datetime they never typed.
 */
const isoDate = z.preprocess(
	(value) => {
		if (value instanceof Date) return value.toISOString().slice(0, 10);
		if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) return value.slice(0, 10);
		return value;
	},
	z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO date, e.g. 2026-09-30')
		.refine((value) => {
			// Date.parse('2025-02-31') happily rolls over to 3 March, so round-trip the
			// components instead of trusting it.
			const [year, month, day] = value.split('-').map(Number);
			const parsed = new Date(Date.UTC(year, month - 1, day));
			return (
				parsed.getUTCFullYear() === year &&
				parsed.getUTCMonth() === month - 1 &&
				parsed.getUTCDate() === day
			);
		}, 'is not a real date')
);

export const projectSchema = z.object({
	title: z.string().min(1),
	blurb: z.string().min(1).max(200),
	tags: z.array(z.enum(TAGS)).min(1),
	tools: z.array(z.string().min(1)).default([]),
	date: isoDate,
	/** Absent when the source is private — the page says so rather than showing a gap. */
	repo: z.url().optional(),
	demo: z.url().optional(),
	/** A PDF in static/, standing in as the public artifact when there is no repo. */
	report: z.string().startsWith('/').optional(),
	/** Collaboration disclosure, e.g. "Team project — UC Davis ECS 171". */
	credit: z.string().min(1).optional(),
	/** Empty until real screenshots exist; the gallery renders nothing when empty. */
	images: z.array(z.string().min(1)).default([])
});

export const postSchema = z.object({
	title: z.string().min(1),
	blurb: z.string().min(1).max(200),
	date: isoDate,
	tags: z.array(z.enum(TAGS)).default([])
});

export type ProjectFrontmatter = z.infer<typeof projectSchema>;
export type PostFrontmatter = z.infer<typeof postSchema>;

/**
 * A Project is a thing you built; a Post is a thing you wrote. Separate types on
 * purpose — no `kind` discriminator, so no consumer ever narrows a union to avoid
 * rendering a Post's nonexistent repo link.
 */
export type Project = ProjectFrontmatter & { slug: string };
export type Post = PostFrontmatter & { slug: string };
