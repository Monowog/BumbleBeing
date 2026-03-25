<script lang="ts">  
  import ProjectPage from "$lib/components/project-page.svelte";

  const title = "Multi-Task King";
  const pictures = ["/images/MTKIcon.png", "/images/Fracture.png"];
  const description = "Fun game. I've tried it myself!";
  const tools = ["Godot", "GDScript"];

</script>

<ProjectPage {title} {pictures} {description} {tools} />