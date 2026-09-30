import { browser } from '$app/environment';

const STORAGE_KEY = 'bumblebeing:bees';

function prefersReducedMotion(): boolean {
	if (!browser) return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function storedPreference(): boolean | null {
	if (!browser) return null;
	try {
		const value = localStorage.getItem(STORAGE_KEY);
		return value === 'on' ? true : value === 'off' ? false : null;
	} catch {
		return null;
	}
}

/**
 * Whether the Bees are flying. Phase 5 wires the canvas to this; the header
 * button reads and writes it from Phase 4.
 *
 * Replaces v1's `particleRef` store poked imperatively via `$particleRef
 * .toggleBees()` — the header no longer needs a handle on the canvas.
 */
class BeeState {
	active = $state(true);

	constructor() {
		if (!browser) return;
		// Reduced motion wins over a stored preference: someone who asked the OS for
		// less movement should not have to ask this site separately.
		this.active = prefersReducedMotion() ? false : (storedPreference() ?? true);
	}

	set(active: boolean) {
		this.active = active;
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, active ? 'on' : 'off');
		} catch {
			// Nothing to do: the choice just won't survive a reload.
		}
	}

	toggle() {
		this.set(!this.active);
	}
}

export const bees = new BeeState();
