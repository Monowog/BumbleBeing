import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes so a consumer's `class` prop reliably beats a
 * component's own utility. Without the merge, `<Button class="px-8" />` against a
 * component that hardcodes `px-4` leaves both in the class list and the winner is
 * decided by stylesheet order — a coin flip.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
