<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let container: HTMLDivElement;
  let ctx: CanvasRenderingContext2D;
  let animationFrame: number;
  let particles: Particle[] = [];

  const maxParticles = 300;
  const particleColor = '218, 165, 32'; 
  const k = 0.001;                // spring constant
  const friction = 0.98;          
  const spawnRate = 0.25;
  const inset = 10;
  const popChance = 0.04;   
  const popForce = 6;   

  class Particle {
    x: number; y: number; vx: number; vy: number;
    size: number; alpha: number;
    life: number;
    isExpiring: boolean = false;
    isDead: boolean = false;

    constructor(w: number, h: number) {
      const edge = Math.floor(Math.random() * 4);
      if (edge === 0) { this.x = Math.random() * w; this.y = Math.random() * (2 * inset); }
      else if (edge === 1) { this.x = w - Math.random() * (2 * inset); this.y = Math.random() * h; }
      else if (edge === 2) { this.x = Math.random() * w; this.y = h - Math.random() * (2 * inset); }
      else { this.x = Math.random() * (2 * inset); this.y = Math.random() * h; }

      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.size = Math.random() * 1.5 + 1;
      this.alpha = 0; 
      this.life = Math.random() * 200 + 150; 
    }

    update(w: number, h: number): void {
      this.life--;
      if (this.life <= 0) this.isExpiring = true;

      if (this.isExpiring) {
        this.alpha -= 0.01;
        if (this.alpha <= 0) this.isDead = true;
      } else if (this.alpha < 0.6) {
        this.alpha += 0.02;
      }

      const leftWall = inset;
      const rightWall = w - inset;
      const topWall = inset;
      const bottomWall = h - inset;

      const isOutsideX = this.x < leftWall || this.x > rightWall;
      const isOutsideY = this.y < topWall || this.y > bottomWall;

      if (isOutsideX || isOutsideY) {
        // apply spring when outside, toward the inset lines
        if (this.x < leftWall) this.vx += (leftWall - this.x) * k;
        if (this.x > rightWall) this.vx += (rightWall - this.x) * k;
        if (this.y < topWall) this.vy += (topWall - this.y) * k;
        if (this.y > bottomWall) this.vy += (bottomWall - this.y) * k;
      } else {
        // drift to keep them floating near the border
        const pull = 0.06;
        const distLeft = this.x - leftWall;
        const distRight = rightWall - this.x;
        const distTop = this.y - topWall;
        const distBottom = bottomWall - this.y;
        const minDist = Math.min(distLeft, distRight, distTop, distBottom);

        if (minDist === distLeft) {
          this.vx -= pull;
          if(Math.random() < popChance){
            this.vx += popForce * Math.random();
            this.vy += (Math.random() - 0.5) * popForce;
          }
        }
        else if (minDist === distRight) {
          this.vx += pull;
          if(Math.random() < popChance){
            this.vx -= popForce * Math.random();
            this.vy += (Math.random() - 0.5) * popForce;
          }
        }
        else if (minDist === distTop) {
          this.vy -= pull;
          if(Math.random()*2 < popChance){
            this.vy += popForce * Math.random();
            this.vx += (Math.random() - 0.5) * popForce;
          }
        }
        else if (minDist === distBottom) {
          this.vy += pull;
          if(Math.random()*2 < popChance){
            this.vy -= popForce * Math.random();
            this.vx += (Math.random() - 0.5) * popForce;
          }
        }
      }

      this.vx *= friction;
      this.vy *= friction;
      this.x += this.vx;
      this.y += this.vy;
    }

    draw(c: CanvasRenderingContext2D, off: number): void {
      if (this.alpha <= 0) return;
      c.beginPath();
      c.arc(this.x + off, this.y + off, this.size, 0, Math.PI * 2);
      c.fillStyle = `rgba(${particleColor}, ${this.alpha})`;
      c.fill();
    }
  }

  const animate = (): void => {
    if (!ctx || !canvas || !container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    if (particles.length < maxParticles && Math.random() < spawnRate) {
      particles.push(new Particle(w, h));
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update(w, h);
      p.draw(ctx, 50);
      if (p.isDead) particles.splice(i, 1);
    }

    animationFrame = requestAnimationFrame(animate);
  };

  onMount(() => {
    ctx = canvas.getContext('2d')!;
    
    const ro = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width + 100;
        canvas.height = height + 100;
        // reset/clear on resize
        particles = Array.from({ length: 15 }, () => new Particle(width, height));
      }
    });

    ro.observe(container);
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      ro.disconnect();
    };
  });
</script>

<div class="wrapper" bind:this={container}>
  <canvas bind:this={canvas}></canvas>
  <div class="content">
    <slot />
  </div>
</div>

<style>
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  canvas {
    position: absolute;
    top: -50px;
    left: -50px;
    width: calc(100% + 100px);
    height: calc(100% + 100px);
    pointer-events: none;
    z-index: 1;
    background: transparent;
  }

  .content {
    position: relative;
    z-index: 2;
  }
</style>