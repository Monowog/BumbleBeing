<script>
  import { resolve } from "$app/paths";

  // Props for customization
  export let imageSrc = "src/lib/assets/images/bee++.png";
  export let altText = 'A Master of Bee++';
  export let caption = "Don't wait, see what the buzz is about.";
</script>

<div class="hero-page flex items-center justify-center py-16 px-4">
  <section class="max-w-7xl w-full flex flex-col items-center gap-10 text-center">
    
    <div class="rounded-2xl border-4 border-amber-600 shadow-2xl overflow-hidden group">
      <img src={imageSrc} alt={altText} class="w-full max-w-5xl h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
      
      </div>

    <div class="caption-container">
      <p class="text-xl md:text-2xl font-light text-slate-700 max-w-3xl leading-relaxed">
        {caption}
      </p>
    </div>

    <div class="button-group w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <a href={resolve("/projects")} class="w-full bg-accent text-accent-foreground text-lg font-semibold py-5 rounded-lg shadow-md hover:-translate-y-1 transition-all text-center">
        Explore Projects
      </a>
      
      <a href={resolve("/about-me")} class="w-full bg-accent text-accent-foreground text-lg font-semibold py-5 rounded-lg shadow-md hover:-translate-y-1 transition-all text-center">
        Meet Jackson
      </a>

      <a href={resolve("/blog")} class="w-full bg-accent text-accent-foreground text-lg font-semibold py-5 rounded-lg shadow-md hover:-translate-y-1 transition-all text-center">
        Beelog
      </a>

    </div>

  </section>
</div>