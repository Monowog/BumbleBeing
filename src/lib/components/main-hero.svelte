<script>
  import BeePlusPlus from "$lib/assets/images/Bee++.png";
  import Button from "./ui/button/button.svelte";
  import { fade } from "svelte/transition";
  import { resolve } from "$app/paths";
	import { cubicInOut } from "svelte/easing";

  export let altText = 'A Master of Bee++';
  export let caption = "Find out what all the buzz is about.";
</script>

<div class="flex items-center justify-center py-16 px-4">
  <section class="max-w-7xl w-full flex flex-col items-center gap-10 text-center">

    <div in:fade={{duration: 1400, easing: cubicInOut}} class="rounded-4xl border-4 border-amber-600 shadow-2xl overflow-hidden group">
      <img src={BeePlusPlus} alt={altText} class="w-full max-w-[50rem] h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>


    <div class="caption-container">
      <p class="text-xl md:text-2xl font-light text-secondary max-w-3xl leading-relaxed">
        {caption}
      </p>
    </div>

    <div class="button-group w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 group-hover:bg">

      <Button href={resolve("/about-me")} variant="honeycomb"
      class="w-full h-full text-accent-foreground text-lg font-semibold py-5 rounded-lg shadow-md hover:-translate-y-1 transition-all text-center">
        Meet Jackson
      </Button>

      <Button href={resolve("/projects")} variant="honeycomb"
      class="w-full h-full text-accent-foreground text-lg font-semibold py-5 rounded-lg shadow-md hover:-translate-y-1 transition-all text-center">
        Explore Projects
      </Button>

      <Button href={resolve("/blog")} variant="honeycomb"
      class="w-full h-full text-accent-foreground text-lg font-semibold py-5 rounded-lg shadow-md hover:-translate-y-1 transition-all text-center">
        Beelog
      </Button>

    </div>
  </section>
</div>