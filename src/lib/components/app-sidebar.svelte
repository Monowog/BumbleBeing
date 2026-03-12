<script lang="ts" module>
  import Icon from "@iconify/svelte";
  import { resolve } from "$app/paths";
  const data = {
    navMain: [
      {
        title: "About Me",
        url: "/about-me",
        icon: "mdi:comment-person-outline",
        isActive: true,
        items: [
          {
            title: "Education",
            url: "/about-me/education",
          },
          {
            title: "Experience",
            url: "/about-me/experience",
          },
          {
            title: "Hobbies",
            url: "/about-me/hobbies",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: "mingcute:robot-line",
        items: [
          {
            title: "Bone Fracture Detector",
            url: "#",
          },
          {
            title: "Garbage Classifier",
            url: "#",
          },
          {
            title: "NFL Victor Predictor",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: "solar:book-2-linear",
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/jackson-cmelak/s",
        icon: "mdi:linkedin",
      },
      {
        title: "Github",
        url: "https://github.com/Monowog",
        icon: "mdi:github",
      },
    ],
    projects: [
      {
        name: "DNDIgor",
        url: "#",
        icon: "arcticons:dnd-5e-character-keep",
      },
      {
        name: "Multi-Task King",
        url: "#",
        icon: "tabler:cards",
      },
      {
        name: "Magic: the Glyphening",
        url: "#",
        icon: "streamline-ultimate:keyboard",
      },
    ],
  };
</script>
<script lang="ts">
  import type { ComponentProps } from "svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import NavMain from "./nav-main.svelte";
  import NavProjects from "./nav-projects.svelte";
  import NavSecondary from "./nav-secondary.svelte";
	import SidebarSeparator from "./ui/sidebar/sidebar-separator.svelte";
  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>
<Sidebar.Root class="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...restProps}>
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton size="lg">
          {#snippet child({ props })}
            <a href={resolve("/")} {...props}>
              <div
                class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg"
              >
                <Icon icon="lucide-lab:bee" width=2em height=2em/>
              </div>
              <div class="grid flex-1 text-start leading-tight">
                <span class="truncate text-2xl font-extrabold">BumbleBeing</span>
              </div>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
  <Sidebar.Content>
    <NavMain items={data.navMain} />
    <SidebarSeparator />
    <NavProjects projects={data.projects} />
    <NavSecondary items={data.navSecondary} class="mt-auto" />
  </Sidebar.Content>
</Sidebar.Root>