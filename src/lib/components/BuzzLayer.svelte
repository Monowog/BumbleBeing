<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	/**
	 * The dots that buzz around a hovered or focused header button.
	 *
	 * One canvas for the whole header, not one per button: six independent RAF
	 * loops in a header is how a page starts dropping frames on a mid-range laptop.
	 * The loop only runs while something is actually active, so idle costs nothing.
	 *
	 * Independent of the Bees on purpose — switching those off must not silently
	 * remove hover feedback.
	 */
	let canvas = $state<HTMLCanvasElement | null>(null);
	/** The header element this canvas overlays. */
	let host = $state<HTMLElement | null>(null);

	// No hover on a touch screen: a burst that appears after a tap reads as a
	// rendering glitch, not an affordance. Reduced motion means none of it either.
	// Decided at init rather than in onMount so the canvas is never even emitted.
	const enabled =
		browser &&
		window.matchMedia('(hover: hover)').matches &&
		!window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const DOT_COUNT = 8;
	const ORBIT_PADDING = 4;
	const BUZZ_COLOUR = '218, 165, 32';

	interface Dot {
		angle: number;
		speed: number;
		radiusX: number;
		radiusY: number;
		wobble: number;
		wobbleSpeed: number;
		size: number;
	}

	onMount(() => {
		if (!enabled) return;
		const element = canvas;
		const header = host?.parentElement;
		if (!element || !header) return;

		const ctx = element.getContext('2d');
		if (!ctx) return;

		let frame = 0;
		let active: HTMLElement | null = null;
		let dots: Dot[] = [];
		let startedAt = 0;

		function resize() {
			if (!element || !header) return;
			const ratio = window.devicePixelRatio || 1;
			const { width, height } = header.getBoundingClientRect();
			element.width = width * ratio;
			element.height = height * ratio;
			element.style.width = `${width}px`;
			element.style.height = `${height}px`;
			ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
		}

		function makeDots(): Dot[] {
			return Array.from({ length: DOT_COUNT }, () => ({
				angle: Math.random() * Math.PI * 2,
				speed: 0.02 + Math.random() * 0.03,
				radiusX: 0,
				radiusY: 0,
				wobble: Math.random() * Math.PI * 2,
				wobbleSpeed: 0.08 + Math.random() * 0.12,
				size: 1.8 + Math.random() * 1.6
			}));
		}

		function tick() {
			if (!ctx || !element || !header) return;
			ctx.clearRect(0, 0, element.width, element.height);

			if (!active) {
				// Nothing hovered or focused: stop entirely rather than spin.
				frame = 0;
				return;
			}

			const headerBox = header.getBoundingClientRect();
			const box = active.getBoundingClientRect();
			const cx = box.left - headerBox.left + box.width / 2;
			const cy = box.top - headerBox.top + box.height / 2;
			const baseX = box.width / 2 + ORBIT_PADDING;
			const baseY = box.height / 2 + ORBIT_PADDING;

			// Fade in over ~200ms so a cursor crossing the header does not strobe.
			const fade = Math.min(1, (performance.now() - startedAt) / 200);

			for (const dot of dots) {
				dot.angle += dot.speed;
				dot.wobble += dot.wobbleSpeed;
				const wobble = Math.sin(dot.wobble) * 4;
				const x = cx + Math.cos(dot.angle) * (baseX + wobble);
				const y = cy + Math.sin(dot.angle) * (baseY + wobble);
				ctx.beginPath();
				ctx.arc(x, y, dot.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${BUZZ_COLOUR}, ${0.85 * fade})`;
				ctx.fill();
			}

			frame = requestAnimationFrame(tick);
		}

		function activate(target: HTMLElement) {
			if (active === target) return;
			active = target;
			dots = makeDots();
			startedAt = performance.now();
			if (frame === 0) frame = requestAnimationFrame(tick);
		}

		function deactivate(target: HTMLElement) {
			if (active !== target) return;
			active = null;
			// The loop clears the canvas and stops itself on the next frame.
			if (frame === 0) frame = requestAnimationFrame(tick);
		}

		function buzzTarget(event: Event): HTMLElement | null {
			const node = event.target;
			if (!(node instanceof Element)) return null;
			return node.closest<HTMLElement>('[data-buzz]');
		}

		function onOver(event: PointerEvent) {
			const target = buzzTarget(event);
			if (target) activate(target);
		}
		function onOut(event: PointerEvent) {
			const target = buzzTarget(event);
			if (target) deactivate(target);
		}
		// focusin/focusout rather than hover alone: a keyboard user gets the same
		// affordance, which is the whole reason this is not a :hover-only effect.
		function onFocusIn(event: FocusEvent) {
			const target = buzzTarget(event);
			if (target && target.matches(':focus-visible')) activate(target);
		}
		function onFocusOut(event: FocusEvent) {
			const target = buzzTarget(event);
			if (target) deactivate(target);
		}

		resize();
		window.addEventListener('resize', resize);
		header.addEventListener('pointerover', onOver);
		header.addEventListener('pointerout', onOut);
		header.addEventListener('focusin', onFocusIn);
		header.addEventListener('focusout', onFocusOut);

		return () => {
			if (frame) cancelAnimationFrame(frame);
			window.removeEventListener('resize', resize);
			header.removeEventListener('pointerover', onOver);
			header.removeEventListener('pointerout', onOut);
			header.removeEventListener('focusin', onFocusIn);
			header.removeEventListener('focusout', onFocusOut);
		};
	});
</script>

<span bind:this={host} class="contents">
	{#if enabled}
		<canvas bind:this={canvas} aria-hidden="true" class="pointer-events-none absolute inset-0 z-0"
		></canvas>
	{/if}
</span>
