<script lang="ts">
  import { page } from '$app/state';
  import BeeMovieScript from "$lib/assets/json/BeeMovie.json";
</script>

<div class="flex flex-col max-w-3xl text-center justify-center items-center py-[40%] px-4 overflow-auto gap-60">
  <p class="text-5xl">
    Error 404: Page {page.error?.message}
  </p>
  <p>
    {BeeMovieScript.data}
  </p>
</div>