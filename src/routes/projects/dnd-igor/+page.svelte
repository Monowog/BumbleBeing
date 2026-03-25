<script lang="ts">  
  import ProjectPage from "$lib/components/project-page.svelte";

  const title = "DNDIgor";
  const pictures = ["/images/DNDIgorIcon.png", "/images/Fracture.png"];
  const description = "Fun game. I've tried it myself!";
  const tools = ["Node.js", "Discord.js", "Typescript", "SQLite3"];

</script>

<ProjectPage {title} {pictures} {description} {tools} />