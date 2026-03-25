<script lang="ts">
  import Repeller from '$lib/components/repeller.svelte';
  import Flower from '$lib/components/project-flower.svelte';

</script>
<Repeller>
  <Flower centerImage="images/ProjectsCentered.png" petalImages={[
      "images/DNDIgorIcon.png",
      "images/MTKIcon.png",
      "images/MTGIcon.png",
      "images/MTKIcon.png",
      "images/MTKIcon.png",
      "images/MTGIcon.png",
      "images/MTGIcon.png"
    ]} 
    urls={[
      "/projects/dnd-igor",
      "/projects/multi-task-king",
      "/projects/magic-the-glyphening",
      "/projects/multi-task-king",
      "/projects/multi-task-king",
      "/projects/magic-the-glyphening",
      "/projects/magic-the-glyphening"
    ]}/>
</Repeller>