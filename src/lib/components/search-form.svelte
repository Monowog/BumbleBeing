<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import type { HTMLFormAttributes } from "svelte/elements";
  import type { WithElementRef } from "$lib/utils.js";
  let { ref = $bindable(null), ...restProps }: WithElementRef<HTMLFormAttributes> = $props();
</script>
<form {...restProps} bind:this={ref}>
  <div class="relative">
    <Label for="search" class="sr-only">Search</Label>
    <Sidebar.Input id="search" placeholder="Type to search..." class="h-10 ps-10 text-xl" />
    <Icon icon="material-symbols:search"
      class="pointer-events-none absolute inset-s-3 top-1/2 size-5 -translate-y-1/2 opacity-50 select-none"
    />
  </div>
</form>