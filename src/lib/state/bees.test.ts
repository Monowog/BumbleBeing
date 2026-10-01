import { describe, expect, it } from 'vitest';
import { resolveBeePreference } from './bees.svelte';

describe('resolveBeePreference', () => {
	it('flies by default when nothing is stored', () => {
		expect(resolveBeePreference(false, null)).toBe(true);
	});

	it('honours a stored "off"', () => {
		expect(resolveBeePreference(false, false)).toBe(false);
	});

	it('honours a stored "on"', () => {
		expect(resolveBeePreference(false, true)).toBe(true);
	});

	it('stays still under reduced motion with nothing stored', () => {
		expect(resolveBeePreference(true, null)).toBe(false);
	});

	it('lets reduced motion override a stored "on"', () => {
		// The rule worth protecting: asking the OS for less movement is enough, and
		// a preference set here on a previous visit must not undo it.
		expect(resolveBeePreference(true, true)).toBe(false);
	});
});
