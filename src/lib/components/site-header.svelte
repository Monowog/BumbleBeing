<script lang="ts">
  import Icon from "@iconify/svelte";
  import { loadIcons } from "@iconify/svelte";
  import SearchForm from "./search-form.svelte";
  import Breadcrumbs from "$lib/components/breadcrumbs.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { ModeButton } from "$lib/components/ui/mode-button/index.js";
  import { particleRef } from "$lib/store";
  import { onMount } from "svelte";

  const iconsToLoad = ["akar-icons:sidebar-left", "mdi:beehive-outline", "mdi:beehive-off-outline"];

  let beesActive = true;
  const sidebar = Sidebar.useSidebar();

  function handleBeeClicked () {
    beesActive = !beesActive;
    $particleRef?.toggleBees();
  }

  onMount(() => {
    loadIcons(iconsToLoad);
  });
</script>
<header class="bg-background fixed top-0 z-50 flex w-full items-center border-b">
  <div class="sticky flex h-(--header-height) w-full items-center gap-2 px-4">
    <Button class="size-8" variant="ghost" size="icon" onclick={sidebar.toggle}>
      <Icon icon="akar-icons:sidebar-left" class="size-6"/>
    </Button>
    <Separator orientation="vertical" class="me-2 h-4" />
    <Breadcrumbs />
    <SearchForm class="w-full sm:ms-auto sm:w-auto" />
    <ModeButton />
    <Button class="size-10" variant="outline" onclick={handleBeeClicked}>
      {#if beesActive}
        <Icon icon="mdi:beehive-outline" 
          class="size-6"
        />
      {:else}
        <Icon icon="mdi:beehive-off-outline"
          class="size-6 "
        />
      {/if}
  <span class="sr-only">Toggle theme</span>
    </Button>
  </div>
</header>