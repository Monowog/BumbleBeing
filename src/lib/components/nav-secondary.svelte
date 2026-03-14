<script lang="ts">
  import type { ComponentProps } from "svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import Icon from "@iconify/svelte";
  let {
    items,
    ...restProps
  }: {
    items: {
      title: string;
      url: string;
      icon: string;
    }[];
  } & ComponentProps<typeof Sidebar.Group> = $props();
</script>
<Sidebar.Group {...restProps}>
  <Sidebar.GroupContent>
    <Sidebar.Menu>
      {#each items as item (item.title)}
        <Sidebar.MenuItem>
          <Sidebar.MenuButton size="sm">
            {#snippet child({ props })}
              <a rel="external" href={item.url} {...props}> 
                <Icon icon={item.icon}/>
                <span class="text-[1.4rem]">{item.title}</span>
              </a>
            {/snippet}
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      {/each}
    </Sidebar.Menu>
  </Sidebar.GroupContent>
</Sidebar.Group>