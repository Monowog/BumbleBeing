<script lang="ts">
  import Icon from "@iconify/svelte";
  import SearchForm from "./search-form.svelte";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import ModeButton from "$lib/components/ui/mode-button/mode-button.svelte";
	import BreadcrumbSeparator from "./ui/breadcrumb/breadcrumb-separator.svelte";

  let pathNode = ["Home", "About-Me", "Education"];
  const sidebar = Sidebar.useSidebar();
</script>
<header class="bg-background sticky top-0 z-50 flex w-full items-center border-b">
  <div class="flex h-(--header-height) w-full items-center gap-2 px-4">
    <Button class="size-8" variant="ghost" size="icon" onclick={sidebar.toggle}>
      <Icon icon="akar-icons:sidebar-left" class="size-6"/>
    </Button>
    <Separator orientation="vertical" class="me-2 h-4" />
    <Breadcrumb.Root class="hidden sm:block">
      <Breadcrumb.List>
        {#each pathNode as path, index (path)}
          {#if index > 0}
            <Breadcrumb.Item>
              <BreadcrumbSeparator />
            </Breadcrumb.Item>
          {/if}
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/"><span class="text-xl">{pathNode[index]}</span></Breadcrumb.Link>
          </Breadcrumb.Item>
        {/each}
      </Breadcrumb.List>
    </Breadcrumb.Root>
    <SearchForm class="w-full sm:ms-auto sm:w-auto" />
    <ModeButton />
  </div>
</header>