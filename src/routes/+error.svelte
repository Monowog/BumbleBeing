<script lang="ts">
  import { page } from '$app/state';
  import BeeMovieScript from "$lib/assets/json/BeeMovie.json";
</script>

<div class="flex flex-col max-w-3xl text-center justify-center items-center py-[50%] px-4 overflow-auto gap-60">
  <p class="text-5xl text-shadow-lg text-shadow-chart-2/50">
    Error 404: Page {page.error?.message}
  </p>
  <p class="bg-background outline-4 outline-[--button-secondary] rounded-lg border-10 border-transparent text-shadow-sm text-shadow-chart-3/30">
    {BeeMovieScript.data}
  </p>
</div>