/**
 * Canonical origin. Hardcoded because prerendering has no real request URL.
 *
 * Note the `www`: the apex 307s to it, so that is the host actually serving
 * pages. Pointing canonical links, og:url and the sitemap at the apex would name
 * a URL that only redirects.
 */
export const SITE_URL = 'https://www.bumblebeing.com';

export const SITE_NAME = 'BumbleBeing';

export const SITE_DESCRIPTION =
	"Jackson Cmelak's portfolio: machine learning, systems software, and the occasional web application.";

/** One static card covers every page. Per-project images are a deliberate non-goal. */
export const OG_IMAGE = '/og.png';

/** Absolute URL for a path, for canonical links and social cards. */
export function absolute(path: string): string {
	return new URL(path, SITE_URL).href;
}
