<script lang="ts">
  import Repeller from '$lib/components/repeller.svelte';
  import Flower from '$lib/components/project-flower.svelte';

</script>
<Repeller>
  <Flower centerImage="/images/ModelsCenter.png" 
    petalImages={[
      "/images/Fracture.png",
      "/images/Garbages.png",
      "/images/NFLLogo.jpg"
    ]}
    urls={[
      "/models/fracture-detector",
      "/models/garbage-classifier",
      "/models/victor-predictor"
    ]}
  />
</Repeller>