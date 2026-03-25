<script>
  import { innerWidth } from 'svelte/reactivity/window';
  import { resolve } from '$app/paths';
  import FlowerStem from './flower-stem.svelte';

  let { centerImage, petalImages, urls } = $props();

	let centralImage = $derived(centerImage);
	let radius = $derived(innerWidth.current/7); 
	
	let hoveredIndex = $state(null);

</script>

<div class="container" draggable="false">
	<img src={centralImage} class="center-img" alt="Center" draggable="false"/>
  <FlowerStem />

	{#each petalImages as src, i (i)}
		{@const angle = ((360 / petalImages.length) * i) + ((360 / petalImages.length) - 90)}
    
    <button 
      class="orbit-item"
      class:growing={hoveredIndex === i}
      style="
        --angle: {angle}deg; 
        --radius: {radius}px;
      "
      onmouseenter={() => {
        hoveredIndex = i;
        centralImage = petalImages[i];
        }}
      onmouseleave={() => {
        hoveredIndex = null;
        centralImage = centerImage;
        }}
      >
      <a href={resolve(urls[i])} draggable="false">
        <img {src} alt="Orbit {i}" draggable="false"/>
      </a>
    </button>
	{/each}
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		height: auto;
		display: grid;
		place-items: center;
		margin: 50px auto;
	}

	.center-img {
		width: 18vw;
		height: 18vw;
    border-width: 10px;
    border-color: var(--color-chart-5);
		border-radius: 50%;
		z-index: 2;
    background-color: var(--color-chart-1);
    box-shadow: 0 4px 10px rgba(0,0,0,0.4);
	}

	.orbit-item {
		position: absolute;
		width: 16vw;
		height: 16vw;
		padding: 0;
		border: none;
		background: none;
		cursor: pointer;
		
		transform: 
			rotate(var(--angle)) 
			translateX(var(--radius)) 
			rotate(calc(-1 * var(--angle)));
		
		transition: transform 0.3s ease, z-index 0s, opacity 0.3s ease;
		z-index: 1;
	}

	.orbit-item img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
		border: 6px solid rgb(163, 0, 95);
		box-shadow: 0 4px 10px rgba(0,0,0,0.4);
    background-color: rgb(173, 60, 126);
	}

	/* Scale up when hovered */
	.orbit-item.growing {
		transform: 
			rotate(var(--angle)) 
			translateX(var(--radius)) 
			rotate(calc(-1 * var(--angle))) 
			scale(1.5);
    opacity: 0.40;
		z-index: 10;
	}

  .orbit-item.growing img {
    border: 6px solid rgb(150, 107, 132);
  }
</style>