<script lang="ts">
  import * as Carousel from "./ui/carousel/index.ts";
  import * as Card from "./ui/card/index.ts";
  import { Badge } from "./ui/badge/index.ts";

  let { title, pictures, description, tools } = $props();
</script>

<div class="flex flex-col items-center gap-6">
  <span class="text-5xl font-extrabold underline text-shadow-[0_35px_35px_rgb(0_0_0_/0.25)]">
    {title}
  </span>
  <Carousel.Root class="w-full max-w-md">
    <Carousel.Content>
      {#each pictures as picture, i (i)}
        <Carousel.Item>
          <Card.Root class="bg-transparent">
            <Card.Content
              class="flex items-center justify-center"
            >
              <img src={picture} alt="picture {i}" class="outline-2 outline-carousel-secondary rounded-4xl">
            </Card.Content>
          </Card.Root>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Next />
    <Carousel.Previous />
  </Carousel.Root>
  <div class="grid grid-flow-col-dense gap-1 place-items-center p-2 rounded-3xl bg-highlight/40 outline-2 outline-accent">
    {#each tools as tool, i (i)}
      <Badge variant="outline" class="backdrop-blur-lg border-black bg-carousel-primary/50 w-fit h-auto hover:scale-110 transition-all text-md">{tool}</Badge>
    {/each}
  </div>
  <p class="text-center">
    {description}
  </p>
</div>