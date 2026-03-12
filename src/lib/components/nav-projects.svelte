<script lang="ts">
  import type { Component } from "svelte";
  import FolderIcon from "@lucide/svelte/icons/folder";
  import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
  import ShareIcon from "@lucide/svelte/icons/share";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import Icon from "@iconify/svelte";
	import { resolve } from "$app/paths";

  let {
    projects,
  }: {
    projects: {
      name: string;
      url: string;
      icon: string;
    }[];
  } = $props();
  const sidebar = Sidebar.useSidebar();
</script>
<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
  <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
  <Sidebar.Menu>
    {#each projects as item (item.name)}
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          {#snippet child({ props })}
            <a href={resolve(item.url as "/")} {...props}>
              <Icon icon={item.icon}/>
              <span>{item.name}</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {#snippet child({ props })}
              <Sidebar.MenuAction showOnHover {...props}>
                <EllipsisIcon />
                <span class="sr-only">More</span>
              </Sidebar.MenuAction>
            {/snippet}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            class="w-48"
            side={sidebar.isMobile ? "bottom" : "right"}
            align={sidebar.isMobile ? "end" : "start"}
          >
            <DropdownMenu.Item>
              <FolderIcon class="text-muted-foreground" />
              <span>Github</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <ShareIcon class="text-muted-foreground" />
              <span>Project Details</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Sidebar.MenuItem>
    {/each}
    <Sidebar.MenuItem>
      <Sidebar.MenuButton>
        <EllipsisIcon />
        <span>More</span>
      </Sidebar.MenuButton>
    </Sidebar.MenuItem>
  </Sidebar.Menu>
</Sidebar.Group>