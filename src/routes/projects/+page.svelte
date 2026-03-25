<script>
  import Flower from '$lib/components/project-flower.svelte';

  const imageUrls = [
    'https://picsum.photos/80?1',
    'https://picsum.photos/80?2',
    'https://picsum.photos/80?3',
    'https://picsum.photos/80?4',
    'https://picsum.photos/80?5'
  ];
</script>

{#snippet centerImage()}
  <img src="https://picsum.photos/100?center" alt="center" />
{/snippet}

<Flower 
  images={imageUrls} 
  {centerImage} 
/>