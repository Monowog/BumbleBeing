<script lang="ts">
  import Icon from "@iconify/svelte";
 
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";
</script>
 
<Button onclick={toggleMode} variant="outline" class="size-10">
  <Icon icon="tabler:sun" 
    class="size-6 scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"
  />
  <Icon icon="tabler:moon"
    class="absolute size-5 scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
  />
  <span class="sr-only">Toggle theme</span>
</Button>