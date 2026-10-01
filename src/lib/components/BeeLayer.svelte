<script lang="ts">
	import { onMount } from 'svelte';
	import { bees } from '$lib/state/bees.svelte';

	// Physics carried over from v1's edge-particles.svelte, unchanged.
	const MAX_PARTICLES = 300;
	const SPAWN_RATE = 0.13; //changed from 0.23
	const SPRING = 0.001;
	const FRICTION = 0.98;
	const INSET = 10;
	const POP_CHANCE = 0.12;
	const POP_FORCE = 0.8;
	const DRIFT = 0.04;
	const REPEL_RADIUS = 80;
	const REPEL_STRENGTH = 0.7; //changed from 0.9
	const TRAIL_LENGTH = 8;
	const BEE_COLOUR = '218, 165, 32';
	const TRAIL_COLOUR = '128, 128, 128';

	let canvas = $state<HTMLCanvasElement | null>(null);

	class Bee {
		x: number;
		y: number;
		vx = (Math.random() - 0.5) * 2;
		vy = (Math.random() - 0.5) * 2;
		size = Math.random() * 2 + 1;
		alpha = 0;
		life = Math.random() * 250 + 150;
		trail: Array<{ x: number; y: number }> = [];
		expiring = false;
		dead = false;

		constructor(w: number, h: number) {
			// Spawn on a random edge, which is why they read as drifting in from outside.
			const edge = Math.floor(Math.random() * 4);
			if (edge === 0) {
				this.x = Math.random() * w;
				this.y = Math.random() * (2 * INSET);
			} else if (edge === 1) {
				this.x = w - Math.random() * (2 * INSET);
				this.y = Math.random() * h;
			} else if (edge === 2) {
				this.x = Math.random() * w;
				this.y = h - Math.random() * (2 * INSET);
			} else {
				this.x = Math.random() * (2 * INSET);
				this.y = Math.random() * h;
			}
		}

		/** Called when the reader switches the Bees off: fade out rather than vanish. */
		retire() {
			this.expiring = true;
		}

		update(w: number, h: number, mouseX: number, mouseY: number) {
			this.life--;
			if (this.life <= 0) this.expiring = true;

			this.trail.push({ x: this.x, y: this.y });
			if (this.trail.length > TRAIL_LENGTH) this.trail.shift();

			if (this.expiring) {
				this.alpha -= 0.01;
				if (this.alpha <= 0) this.dead = true;
			} else if (this.alpha < 0.6) {
				this.alpha += 0.02;
			}

			const left = INSET;
			const right = w - INSET;
			const top = INSET;
			const bottom = h - INSET;

			if (this.x < left || this.x > right || this.y < top || this.y > bottom) {
				// Outside the inset: spring back toward it.
				if (this.x < left) this.vx += (left - this.x) * SPRING;
				if (this.x > right) this.vx += (right - this.x) * SPRING;
				if (this.y < top) this.vy += (top - this.y) * SPRING;
				if (this.y > bottom) this.vy += (bottom - this.y) * SPRING;
			} else {
				// Inside: drift back toward the nearest edge, with the occasional pop.
				const distances = [this.x - left, right - this.x, this.y - top, bottom - this.y];
				const nearest = distances.indexOf(Math.min(...distances));
				const pops = Math.random() < POP_CHANCE;
				const jitter = (Math.random() - 0.5) * POP_FORCE;

				if (nearest === 0) {
					this.vx -= DRIFT;
					if (pops) {
						this.vx += POP_FORCE * Math.random();
						this.vy += jitter;
					}
				} else if (nearest === 1) {
					this.vx += DRIFT;
					if (pops) {
						this.vx -= POP_FORCE * Math.random();
						this.vy += jitter;
					}
				} else if (nearest === 2) {
					this.vy -= DRIFT;
					if (pops) {
						this.vy += POP_FORCE * Math.random();
						this.vx += jitter;
					}
				} else {
					this.vy += DRIFT;
					if (pops) {
						this.vy -= POP_FORCE * Math.random();
						this.vx += jitter;
					}
				}
			}

			// Cursor avoidance is per-particle, and always was: v1's separate
			// repeller.svelte was a different effect entirely, and is not ported.
			const dx = this.x - mouseX;
			const dy = this.y - mouseY;
			const distance = Math.hypot(dx, dy);
			if (distance < REPEL_RADIUS && distance > 0) {
				const force = (REPEL_RADIUS - distance) / REPEL_RADIUS;
				this.vx += (dx / distance) * force * REPEL_STRENGTH;
				this.vy += (dy / distance) * force * REPEL_STRENGTH;
			}

			this.vx *= FRICTION;
			this.vy *= FRICTION;
			this.x += this.vx;
			this.y += this.vy;
		}

		draw(ctx: CanvasRenderingContext2D) {
			if (this.alpha <= 0) return;
			for (let i = 0; i < this.trail.length; i++) {
				const point = this.trail[i];
				const ratio = i / this.trail.length;
				ctx.beginPath();
				ctx.arc(point.x, point.y, this.size * ratio, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${TRAIL_COLOUR}, ${this.alpha * ratio * 0.5})`;
				ctx.fill();
			}
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(${BEE_COLOUR}, ${this.alpha})`;
			ctx.fill();
		}
	}

	onMount(() => {
		const element = canvas;
		if (!element) return;
		const ctx = element.getContext('2d');
		if (!ctx) return;

		let swarm: Bee[] = [];
		let frame = 0;
		let mouseX = -9999;
		let mouseY = -9999;
		let width = window.innerWidth;
		let height = window.innerHeight;

		function resize() {
			if (!element) return;
			const ratio = window.devicePixelRatio || 1;
			width = window.innerWidth;
			height = window.innerHeight;
			element.width = width * ratio;
			element.height = height * ratio;
			element.style.width = `${width}px`;
			element.style.height = `${height}px`;
			ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
		}

		function tick() {
			if (!ctx) return;
			ctx.clearRect(0, 0, width, height);
			ctx.globalCompositeOperation = 'lighter';

			if (bees.active && swarm.length < MAX_PARTICLES && Math.random() < SPAWN_RATE) {
				swarm.push(new Bee(width, height));
			}

			for (let i = swarm.length - 1; i >= 0; i--) {
				const bee = swarm[i];
				bee.update(width, height, mouseX, mouseY);
				bee.draw(ctx);
				if (bee.dead) swarm.splice(i, 1);
			}

			// The whole point of the rewrite: v1 kept requestAnimationFrame running
			// forever and merely stopped spawning. Here the loop ends once the last
			// bee has faded, so switching them off costs nothing at all.
			if (!bees.active && swarm.length === 0) {
				frame = 0;
				ctx.clearRect(0, 0, width, height);
				return;
			}
			frame = requestAnimationFrame(tick);
		}

		function start() {
			if (frame === 0) frame = requestAnimationFrame(tick);
		}

		function onPointerMove(event: PointerEvent) {
			mouseX = event.clientX;
			mouseY = event.clientY;
		}

		function onPointerLeave() {
			mouseX = -9999;
			mouseY = -9999;
		}

		resize();
		window.addEventListener('resize', resize);
		window.addEventListener('pointermove', onPointerMove, { passive: true });
		document.addEventListener('pointerleave', onPointerLeave);

		const stopWatching = $effect.root(() => {
			$effect(() => {
				if (bees.active) start();
				else swarm.forEach((bee) => bee.retire());
			});
		});

		return () => {
			stopWatching();
			if (frame) cancelAnimationFrame(frame);
			window.removeEventListener('resize', resize);
			window.removeEventListener('pointermove', onPointerMove);
			document.removeEventListener('pointerleave', onPointerLeave);
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true" class="pointer-events-none fixed inset-0 -z-[5]"
></canvas>
