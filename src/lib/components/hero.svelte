<script>
  import "../../routes/layout.css";
	import Button from "./ui/button/button.svelte";
  export let imageSrc = "https://via.placeholder.com/800x400";
  export let imageAlt = "A Humble Bumbler";
  export let caption = "Abuzz with activity.";
  
  // Array for buttons to keep the markup DRY
  export let buttons = [
    { text: "Education", primary: false },
    { text: "Experience", primary: false },
    { text: "Hobbies", primary: false }
  ];
</script>

<section class="flex-col items-center ps-2 pe-2 max-w-300 m-0 text-center rounded-xl">
  <div class="w-full h-auto ">
    <img src={imageSrc} alt={imageAlt} draggable="false"/>
    <p class="caption">{caption}</p>
  </div>

  <div class="flex-row gap-2 w-full items-stretch">
    {#each buttons as button, i (buttons[i])}
      <Button variant="outline" class="button self-stretch">
        {button.text}
      </Button>
    {/each}
  </div>
</section>

<style>
  .image-container img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .caption {
    margin: 1.5rem 0 2rem;
    font-size: 1.2rem;
    color: #ff0000;
    font-style: italic;
  }

   :dark .caption {
    margin: 1.5rem 0 2rem;
    font-size: 1.2rem;
    color: #cacaca;
    font-style: italic;
  }
</style>
  