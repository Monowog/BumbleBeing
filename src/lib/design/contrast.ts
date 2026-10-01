/**
 * Enough colour maths to assert the palette stays accessible. Not used at
 * runtime — this exists so a token edit that breaks WCAG AA fails the build
 * instead of shipping.
 */

export interface Oklch {
	l: number;
	c: number;
	h: number;
}

export function parseOklch(value: string): Oklch {
	const match = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);
	if (!match) throw new Error(`Not an oklch() colour: ${value}`);
	return { l: Number(match[1]), c: Number(match[2]), h: Number(match[3]) };
}

/** Oklch -> linear sRGB, clamped to gamut. */
export function toLinearSrgb({ l: L, c: C, h }: Oklch): [number, number, number] {
	const hr = (h * Math.PI) / 180;
	const a = C * Math.cos(hr);
	const b = C * Math.sin(hr);
	const l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
	const m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
	const s_ = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
	return [
		4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
		-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
		-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_
	].map((channel) => Math.min(1, Math.max(0, channel))) as [number, number, number];
}

/** Oklch -> Oklab, for interpolation. */
function toOklab({ l, c, h }: Oklch): [number, number, number] {
	const hr = (h * Math.PI) / 180;
	return [l, c * Math.cos(hr), c * Math.sin(hr)];
}

/**
 * Replicates `color-mix(in oklab, a <weight>%, b)`, which the palette uses to mute
 * the primary toward the background. Without this the tests would assert against
 * the unmixed ramp colour and quietly stop describing what actually renders.
 */
export function mixOklch(a: string, b: string, weightOfA: number): Oklch {
	const [al, aa, ab] = toOklab(parseOklch(a));
	const [bl, ba, bb] = toOklab(parseOklch(b));
	const t = weightOfA;
	const l = al * t + bl * (1 - t);
	const na = aa * t + ba * (1 - t);
	const nb = ab * t + bb * (1 - t);
	const hue = (Math.atan2(nb, na) * 180) / Math.PI;
	return { l, c: Math.hypot(na, nb), h: hue < 0 ? hue + 360 : hue };
}

export function relativeLuminance(colour: Oklch): number {
	const [r, g, b] = toLinearSrgb(colour);
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.1 contrast ratio, 1:1 to 21:1. */
export function contrastRatio(foreground: string | Oklch, background: string | Oklch): number {
	const coerce = (value: string | Oklch) => (typeof value === 'string' ? parseOklch(value) : value);
	const a = relativeLuminance(coerce(foreground));
	const b = relativeLuminance(coerce(background));
	const [hi, lo] = a > b ? [a, b] : [b, a];
	return (hi + 0.05) / (lo + 0.05);
}

/** Difference in Oklch lightness, in percentage points. */
export function lightnessDelta(a: string, b: string): number {
	return Math.abs(parseOklch(a).l - parseOklch(b).l) * 100;
}

/** Every `--name: oklch(...)` declaration in a stylesheet. */
export function readOklchTokens(css: string): Record<string, string> {
	const tokens: Record<string, string> = {};
	for (const match of css.matchAll(/(--[a-z0-9-]+):\s*(oklch\([^)]*\))/g)) {
		tokens[match[1]] = match[2];
	}
	return tokens;
}
