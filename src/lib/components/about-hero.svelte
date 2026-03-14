<script>
  import "../../routes/layout.css";
	import Button from "./ui/button/button.svelte";
  export let imageSrc = "https://via.placeholder.com/800x400";
  export let imageAlt = "A Humble Bumbler";
  export let caption = "Abuzz with activity.";
  
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
      <Button variant="honeycomb" class="button self-stretch">
        {button.text}
      </Button>
    {/each}
  </div>
</section>
  