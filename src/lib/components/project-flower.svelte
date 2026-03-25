<script>
  import { innerWidth } from 'svelte/reactivity/window';
  import { resolve } from '$app/paths';

  let centerImage = "images/ProjectsCentered.png";

	let petalImages = [
    "images/DNDIgorIcon.png",
    "images/MTKIcon.png",
    "images/MTGIcon.png",
    "images/FurryThiel.png",
    "images/FurryThiel.png"
	];

  const urls = [
    "/projects/dnd-igor",
    "/projects/multi-task-king",
    "/projects/magic-the-glyphening",
    "/",
    "/"
  ]

	let centralImage = $state(centerImage);
	let radius = $derived(innerWidth.current/7); 
	
	let hoveredIndex = $state(null);

</script>

<div class="container">
	<img src={centralImage} class="center-img" alt="Center" />

	{#each petalImages as src, i (i)}
		{@const angle = (360 / petalImages.length) * i}
    
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
      <a href={resolve(urls[i])}>
        <img {src} alt="Orbit {i}" />
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
		width: 16vw;
		height: 16vw;
    border-width: 3px;
    border-color: var(--color-chart-5);
		border-radius: 50%;
		z-index: 2;
		transition: fade 0.3s ease;
	}

	.orbit-item {
		position: absolute;
		width: 14vw;
		height: 14vw;
		padding: 0;
		border: none;
		background: none;
		cursor: pointer;
		
		transform: 
			rotate(var(--angle)) 
			translateX(var(--radius)) 
			rotate(calc(-1 * var(--angle)));
		
		transition: transform 0.3s ease, z-index 0s;
		z-index: 1;
	}

	.orbit-item img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
		border: 5px double rgb(163, 0, 95);
		box-shadow: 0 4px 10px rgba(0,0,0,0.2);
	}

	/* Scale up when hovered */
	.orbit-item.growing {
		transform: 
			rotate(var(--angle)) 
			translateX(var(--radius)) 
			rotate(calc(-1 * var(--angle))) 
			scale(1.5);
		z-index: 10;
	}
</style>