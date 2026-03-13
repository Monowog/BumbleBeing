<script lang="ts">
	import './layout.css';
  import { onNavigate } from "$app/navigation";
  import { ModeWatcher } from "mode-watcher";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import SiteHeader from "$lib/components/site-header.svelte";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import EdgeParticles from "$lib/components/edge-particles.svelte";

  onNavigate(() => {
    if(!document.startViewTransition) return;

    return new Promise((fulfill) => {
      document.startViewTransition(() => new Promise(fulfill));
    });
  });

	let { children } = $props();
</script>

<ModeWatcher defaultMode="dark"/>


<div class="[--header-height:calc(--spacing(16))] overflow-hidden">
  <Sidebar.Provider class="flex flex-col">
    <SiteHeader />
    <div class="flex flex-1">
      <AppSidebar />
      <main class="flex flex-1 flex-col gap-4 p-4">
        <EdgeParticles>
          {@render children()}
        </EdgeParticles>
      </main>
    </div>
  </Sidebar.Provider>
</div>