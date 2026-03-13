<script lang="ts">
  import Icon from "@iconify/svelte";
  import SearchForm from "./search-form.svelte";
  import Breadcrumbs from "$lib/components/breadcrumbs.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { ModeButton } from "$lib/components/ui/mode-button/index.js";

  const sidebar = Sidebar.useSidebar();
</script>
<header class="bg-background sticky top-0 z-50 flex w-full items-center border-b">
  <div class="flex h-(--header-height) w-full items-center gap-2 px-4">
    <Button class="size-8" variant="ghost" size="icon" onclick={sidebar.toggle}>
      <Icon icon="akar-icons:sidebar-left" class="size-6"/>
    </Button>
    <Separator orientation="vertical" class="me-2 h-4" />
    <Breadcrumbs />
    <SearchForm class="w-full sm:ms-auto sm:w-auto" />
    <ModeButton />
  </div>
</header>