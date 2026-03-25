<script lang="ts">  
  import ProjectPage from "$lib/components/project-page.svelte";

  const title = "Magic: the Glyphening";
  const pictures = ["/images/MTGIcon.png", "/images/Fracture.png"];
  const description = "Fun game. I've tried it myself!";
  const tools = ["REST APIs", "Typescript", "Javascript"];

</script>

<ProjectPage {title} {pictures} {description} {tools} />