<script lang="ts">
  import * as Item from "$lib/components/ui/item/index.js";
  import ProjectCarousel from "./project-carousel.svelte";
 
  const projects = [
    {
      title: "DNDIgor",
      artist: "TTRPG CRUD Bot",
    },
    {
      title: "Multi-Task King",
      artist: "Digital equivalent of my board game by the same name",
    },
    {
      title: "Magic: The Glyphening",
      artist: "Scryfall API-powered Glyphica mod",
    }
  ];
</script>
 
<div class="flex w-full max-w-lg flex-col gap-6">
  <div class="flex w-full max-w-lg flex-col gap-4">
    {#each projects as project, i (i)}
      <div class="flex w-1/2 flex-row">
        <ProjectCarousel />
        <div class="min-w-14"></div>
        <Item.Root>
          {#snippet child({ props })}
            <div class="min-w-4 flex flex-1"></div>
              <a href="#/" {...props}>
                <Item.Content class="m-6">
                  <Item.Title class="line-clamp-1">
                    {project.title}
                  </Item.Title>
                  <Item.Description>{project.artist}</Item.Description>
                </Item.Content>
              </a>
          {/snippet}
        </Item.Root>
      </div>
      {#if i !== projects.length - 1}
        <div class="w-full h-0.5 bg-linear-to-r from-chart-4/20 via-chart-5/50 to-chart-4/20"></div>
      {/if}
    {/each}
  </div>
</div>