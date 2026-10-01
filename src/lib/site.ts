/** Canonical origin. Hardcoded because prerendering has no real request URL. */
export const SITE_URL = 'https://bumblebeing.com';

export const SITE_NAME = 'BumbleBeing';

export const SITE_DESCRIPTION =
	"Jackson Cmelak's portfolio: machine learning, systems software, and the occasional web application.";

/** One static card covers every page. Per-project images are a deliberate non-goal. */
export const OG_IMAGE = '/og.png';

/** Absolute URL for a path, for canonical links and social cards. */
export function absolute(path: string): string {
	return new URL(path, SITE_URL).href;
}
