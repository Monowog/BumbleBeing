/** The four top-level sections. Order is the header's order. */
export const NAV_LINKS = [
	{ href: '/', label: 'Home' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/about', label: 'About' },
	{ href: '/blog', label: 'Beelog' }
] as const;

export const SOCIAL_LINKS = [
	{ href: '/JacksonCmelakResume.pdf', label: 'Résumé' },
	{ href: 'https://www.linkedin.com/in/jackson-cmelak/', label: 'LinkedIn' },
	{ href: 'https://github.com/Monowog', label: 'GitHub' }
] as const;

/**
 * `/projects` stays active on `/projects/booster-tutor`, but `/` must match
 * exactly or it would be active everywhere.
 */
export function isActive(pathname: string, href: string): boolean {
	if (href === '/') return pathname === '/';
	return pathname === href || pathname.startsWith(`${href}/`);
}
