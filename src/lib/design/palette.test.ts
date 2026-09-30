import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contrastRatio, lightnessDelta, readOklchTokens } from './contrast';

const tokens = readOklchTokens(readFileSync('src/app.css', 'utf8'));
const token = (name: string) => {
	const value = tokens[name];
	if (!value) throw new Error(`app.css no longer defines ${name}`);
	return value;
};

const AA = 4.5;

describe.each([
	['body text on background', '--brown-900', '--paper'],
	['body text on surface', '--brown-900', '--beige-100'],
	['muted text on background', '--warm-500', '--paper'],
	['text on primary', '--brown-900', '--honey-500'],
	['chip: web', '--chip-web-ink', '--chip-web-bg'],
	['chip: ml', '--chip-ml-ink', '--chip-ml-bg'],
	['chip: systems', '--chip-systems-ink', '--chip-systems-bg'],
	['chip: game', '--chip-game-ink', '--chip-game-bg'],
	['dark body text on background', '--cream', '--umber-900'],
	['dark body text on surface', '--cream', '--umber-800'],
	['dark muted text on background', '--warm-400', '--umber-900'],
	['dark text on primary', '--brown-900', '--honey-400'],
	['dark chip: web', '--chip-web-ink-dark', '--chip-web-bg-dark'],
	['dark chip: ml', '--chip-ml-ink-dark', '--chip-ml-bg-dark'],
	['dark chip: systems', '--chip-systems-ink-dark', '--chip-systems-bg-dark'],
	['dark chip: game', '--chip-game-ink-dark', '--chip-game-bg-dark']
])('%s', (_label, foreground, background) => {
	it(`meets WCAG AA (${AA}:1)`, () => {
		expect(contrastRatio(token(foreground), token(background))).toBeGreaterThanOrEqual(AA);
	});
});

describe('honeycomb texture', () => {
	// v1's cells sat 1.97% apart, which is effectively invisible on a laptop screen.
	it.each([
		['light', '--paper', '--beige-200'],
		['dark', '--umber-900', '--umber-750']
	])('%s cells are 4-5%% from their ground', (_theme, ground, cell) => {
		const delta = lightnessDelta(token(ground), token(cell));
		expect(delta).toBeGreaterThanOrEqual(4);
		expect(delta).toBeLessThanOrEqual(5);
	});
});
