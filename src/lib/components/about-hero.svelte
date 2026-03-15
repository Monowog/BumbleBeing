<script>
  import "../../routes/layout.css";
	import Button from "./ui/button/button.svelte";
  import { resolve } from "$app/paths";
  export let imageSrc = "https://via.placeholder.com/800x400";
  export let imageAlt = "A Humble Bumbler";
  
  export let buttons = [
    { text: "Education", href: resolve("/about-me/education")},
    { text: "Experience", href: resolve("/about-me/experience")},
    { text: "Hobbees", href: resolve("/about-me/hobbies")}
  ];
</script>

<div class="flex items-center justify-center py-16 px-4">
  <section class="max-w-3xl w-full flex flex-col items-center gap-2 text-center">

    <span class="text-4xl border-transparent pt-6">Hi, my name's Jackson.</span>
    <span class="text-2xl border-transparent pb-4">I'm a Software Engineer and Game Designer.</span>

    <div class="rounded-4xl border-4 border-amber-600 shadow-2xl overflow-hidden group">
      <img src={imageSrc} alt={imageAlt} class="w-full max-w-5xl h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>


    <div class="button-group w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 group-hover:bg pt-8">
      {#each buttons as button, i (buttons[i])}
        <Button href={button.href} variant="honeycomb" class="w-full h-full text-accent-foreground text-lg font-semibold py-5 rounded-lg shadow-md hover:-translate-y-1 transition-all text-center">
          {button.text}
        </Button>
      {/each}
    </div>
  </section>
</div>

  