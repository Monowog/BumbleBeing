<script lang="ts">
  import * as Carousel from "./ui/carousel/index.ts";
  import * as Card from "./ui/card/index.ts";
  import { Badge } from "./ui/badge/index.ts";

  let { title, pictures, description, tools } = $props();
</script>

<div class="flex flex-col items-center gap-[5vh]">
  <span class="text-3xl font-extrabold">
    {title}
  </span>
  <Carousel.Root class="w-full max-w-md">
    <Carousel.Content>
      {#each pictures as picture, i (i)}
        <Carousel.Item>
          <Card.Root class="bg-transparent rounded-4xl">
            <Card.Content
              class="flex aspect-square items-center justify-center"
            >
              <img src={picture} alt="picture {i}" class="outline-2 outline-carousel-secondary rounded-2xl">
            </Card.Content>
          </Card.Root>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Next />
    <Carousel.Previous />
  </Carousel.Root>
  <p>
    {description}
  </p>
  <div class="grid grid-flow-col-dense gap-1 place-items-center">
    {#each tools as tool, i (i)}
      <Badge variant="outline" class="backdrop-blur-lg">{tool}</Badge>
    {/each}
  </div>
</div>