<script>
  import { spring } from 'svelte/motion';

  let { children, ...rest } = $props();

  let element;
  
  let coords = spring({ x: 0, y: 0 }, {
    stiffness: 0.05,
    damping: 0.8
  });

  const maxDistance = 500;
  const strength = 10;    

  function handleGlobalMouseMove(e) {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (distance < maxDistance) {
      const angle = Math.atan2(deltaY, deltaX);

      coords.set({
        x: -Math.cos(angle) * strength,
        y: -Math.sin(angle) * strength
      });
    } else {
      coords.set({ x: 0, y: 0 });
    }
  }

  function handleMouseLeave() {
    coords.set({ x: 0, y: 0 });
  }
</script>

<svelte:window 
  onmousemove={handleGlobalMouseMove} 
  onmouseleave={handleMouseLeave} 
/>

<div 
  bind:this={element}
  class="subtle-repel"
  style:transform="translate({$coords.x}px, {$coords.y}px)"
  {...rest}
>
  {@render children?.()}
</div>

<style>
  .subtle-repel {
    display: inline-block;
    will-change: transform;
    transition: transform 0.1s linear; 
  }
</style>