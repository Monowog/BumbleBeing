import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

/** Also read by the pre-paint script in app.html. Keep the two in step. */
export const THEME_STORAGE_KEY = 'bumblebeing:theme';

function storedTheme(): Theme | null {
	if (!browser) return null;
	try {
		const value = localStorage.getItem(THEME_STORAGE_KEY);
		return value === 'light' || value === 'dark' ? value : null;
	} catch {
		// Private browsing, or site data blocked. Fall through to the system preference.
		return null;
	}
}

function systemTheme(): Theme {
	if (!browser) return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * The reader's light/dark choice. Replaces v1's `mode-watcher` dependency; the
 * bee layer gets the same shape in `bees.svelte.ts` (Phase 4).
 */
class ThemeState {
	current = $state<Theme>('light');

	constructor() {
		if (browser) this.current = storedTheme() ?? systemTheme();
	}

	get isDark() {
		return this.current === 'dark';
	}

	set(theme: Theme) {
		this.current = theme;
		if (!browser) return;
		document.documentElement.classList.toggle('dark', theme === 'dark');
		try {
			localStorage.setItem(THEME_STORAGE_KEY, theme);
		} catch {
			// Nothing to do: the choice just won't survive a reload.
		}
	}

	toggle() {
		this.set(this.current === 'dark' ? 'light' : 'dark');
	}
}

export const theme = new ThemeState();
