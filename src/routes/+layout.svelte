<script lang="ts">
	import './layout.css';
  import { onNavigate } from "$app/navigation";
  import { ModeWatcher } from "mode-watcher";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import SiteHeader from "$lib/components/site-header.svelte";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import EdgeParticles from "$lib/components/edge-particles.svelte";
  import { particleRef } from '$lib/store';
  import { dev } from '$app/environment';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';

  injectAnalytics({ mode: dev ? 'development' : 'production' });

  onNavigate(() => {
    if(!document.startViewTransition) return;

    return new Promise((fulfill: () => void) => {
      document.startViewTransition(() => new Promise(fulfill));
    });
  });

	let { children } = $props();
</script>

<ModeWatcher defaultMode="light"/>


<div class="[--header-height:calc(--spacing(16))] overflow-hidden">
  <Sidebar.Provider class="flex flex-col">
    <SiteHeader />
    <div class="flex flex-1">
      <AppSidebar />
      <main class="flex flex-1 flex-col gap-4 p-4 honeycomb">
        <EdgeParticles bind:this={$particleRef}>
          {@render children()}
        </EdgeParticles>
      </main>
    </div>
  </Sidebar.Provider>
</div>

<style>
  .honeycomb {
  --s: 40px;
  --c1: var(--honeycomb-primary);
  --c2: var(--honeycomb-secondary);
  
  --c:#0000,var(--c1) .5deg 119.5deg,#0000 120deg;
  --g1:conic-gradient(from  60deg at 56.25% calc(425%/6),var(--c));
  --g2:conic-gradient(from 180deg at 43.75% calc(425%/6),var(--c));
  --g3:conic-gradient(from -60deg at 50%   calc(175%/12),var(--c));
  background:
    var(--g1),var(--g1) var(--s) calc(1.73*var(--s)),
    var(--g2),var(--g2) var(--s) calc(1.73*var(--s)),
    var(--g3) var(--s) 0,var(--g3) 0 calc(1.73*var(--s)) 
    var(--c2);
  background-size: calc(2*var(--s)) calc(3.46*var(--s));
  }
</style>