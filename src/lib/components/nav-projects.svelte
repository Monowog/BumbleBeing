<script lang="ts">
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
  <Sidebar.GroupLabel><span class="text-[.95rem]">Projects</span></Sidebar.GroupLabel>
  <Sidebar.Menu>
    {#each projects as item (item.name)}
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          {#snippet child({ props })}
            <a href={resolve(item.url as "/")} {...props}>
              <Icon icon={item.icon}/>
              <span class="text-lg">{item.name}</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {#snippet child({ props })}
              <Sidebar.MenuAction showOnHover {...props}>
                <Icon icon="gravity-ui:ellipsis"/>
                <span class="sr-only text-lg">More</span>
              </Sidebar.MenuAction>
            {/snippet}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            class="w-48"
            side={sidebar.isMobile ? "bottom" : "right"}
            align={sidebar.isMobile ? "end" : "start"}
          >
            <DropdownMenu.Item>
              <Icon icon="mynaui:github" class="text-muted-foreground" />
              <span class="text-base">Github</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Icon icon="material-symbols:folder-outline" class="text-muted-foreground" />
              <span>Project Details</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Sidebar.MenuItem>
    {/each}
    <Sidebar.MenuItem>
      <Sidebar.MenuButton>
        <Icon icon="gravity-ui:ellipsis"/>
        <span class="text-lg ">More</span>
      </Sidebar.MenuButton>
    </Sidebar.MenuItem>
  </Sidebar.Menu>
</Sidebar.Group>