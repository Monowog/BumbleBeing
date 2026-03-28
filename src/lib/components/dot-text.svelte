<script>
  import { onMount, untrack } from 'svelte';

  let { 
    text = "Jackson Cmelak", 
    dotColor = "#DAA520", 
    dotSize = 2.5, 
    spacing = 7,
    mouseRadius = 80,
    force = 0.2 
  } = $props();

  const textWidth = 1000;
  const textHeight = 150;

  let canvas = $state();
  let ctx;
  let particles = [];
  let mouse = { x: -1000, y: -1000 };
  let wanderForce = 1.2;
  let wanderRate = 0.01;

  class Particle {
    constructor(x, y) {
      this.x = textWidth/2 + (Math.random() - 0.5) * 200;
      this.y = textHeight/2 + (Math.random() - 0.5) * 100;
      this.baseX = x;
      this.baseY = y;
      this.vx = 0;
      this.vy = 0;
      this.friction = 0.86;
      this.ease = 0.01;
    }

    update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouseRadius) {
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouseRadius;
        let forceWeight = ((maxDistance - distance) / maxDistance) * force;
        
        this.vx -= forceDirectionX * forceWeight;
        this.vy -= forceDirectionY * forceWeight;
      } else if (Math.random() < wanderRate) { //Random ambient motion
        let forceDirectionX = Math.random() - 0.5;
        let forceDirectionY = Math.random() - 0.5;
        
        this.vx -= forceDirectionX * wanderForce;
        this.vy -= forceDirectionY * wanderForce;
      }

      // Return to home position
      this.vx += (this.baseX - this.x) * this.ease;
      this.vy += (this.baseY - this.y) * this.ease;

      this.vx *= this.friction;
      this.vy *= this.friction;

      this.x += this.vx;
      this.y += this.vy;
    }

    draw() {
      ctx.fillStyle = dotColor;
      ctx.beginPath();
      ctx.arc(this.x, this.y, dotSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    if (!ctx) return;
    const buffer = document.createElement('canvas');
    const bCtx = buffer.getContext('2d', { willReadFrequently: true });
    buffer.width = textWidth;
    buffer.height = textHeight;

    bCtx.font = "bold 100px sans-serif";
    bCtx.textAlign = "center";
    bCtx.textBaseline = "middle";
    bCtx.fillText(text, textWidth/2, textHeight/2);

    const imageData = bCtx.getImageData(0, 0, textWidth, textHeight).data;
    const newParticles = [];

    for (let y = 0; y < textHeight; y += spacing) {
      for (let x = 0; x < textWidth; x += spacing) {
        if (imageData[(y * textWidth + x) * 4 + 3] > 128) {
          newParticles.push(new Particle(x, y));
        }
      }
    }
    particles = newParticles;
  }

  $effect(() => {
    untrack(() => {
      if (text) initParticles();
    });
  });

  function animate() {
    ctx.clearRect(0, 0, textWidth, textHeight);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }

  onMount(() => {
    ctx = canvas.getContext('2d');
    initParticles();
    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  });

  function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function handleMouseLeave() {
    mouse.x = -1000;
    mouse.y = -1000;
  }
</script>

<canvas 
  bind:this={canvas} 
  width={textWidth} 
  height={textHeight}
  onmousemove={handleMouseMove}
  onmouseleave={handleMouseLeave}
></canvas>

<style>
  canvas {
    width: 100%;
    height: auto;
    display: block;
  }
</style>