<script lang="ts">
  import * as Item from "$lib/components/ui/item/index.js";
  import ProjectCarousel from "./project-carousel.svelte";
 
  const music = [
    {
      title: "Midnight City Lights",
      artist: "Neon Dreams",
      album: "Electric Nights",
      duration: "3:45"
    },
    {
      title: "Coffee Shop Conversations",
      artist: "The Morning Brew",
      album: "Urban Stories",
      duration: "4:05"
    },
    {
      title: "Digital Rain",
      artist: "Cyber Symphony",
      album: "Binary Beats",
      duration: "3:30"
    }
  ];
</script>
 
<div class="flex w-full max-w-md flex-col gap-6">
  <div class="flex w-full max-w-md flex-col gap-4">
    {#each music as song (song)}
      <div class="flex w-1/4 flex-row">
        <ProjectCarousel />
        <Item.Root>
          {#snippet child({ props })}
            <a href="#/" {...props}>
              <Item.Content>
                <Item.Title class="line-clamp-1">
                  {song.title} -
                  <span class="text-muted-foreground">{song.album}</span>
                </Item.Title>
                <Item.Description>{song.artist}</Item.Description>
              </Item.Content>
              <Item.Content class="flex-none text-center">
                <Item.Description>{song.duration}</Item.Description>
              </Item.Content>
            </a>
          {/snippet}
        </Item.Root>
      </div>
    {/each}
  </div>
</div>