<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as Collapsible from "$lib/components/ui/collapsible/index.js";
  import Icon from "@iconify/svelte";
  import { resolve } from "$app/paths";

  let {
    items,
  }: {
    items: {
      title: string;
      url: string;
      icon: string;
      isActive?: boolean;
      items?: {
        title: string;
        url: string;
      }[];
    }[];
  } = $props();
</script>
<Sidebar.Group>
  <Sidebar.GroupLabel><span class="text-[1.2rem]">ArcHives</span></Sidebar.GroupLabel>
  <Sidebar.Menu>
    {#each items as item (item.title)}
      <Collapsible.Root open={item.isActive}>
        {#snippet child({ props })}
          <Sidebar.MenuItem {...props}>
            <Sidebar.MenuButton tooltipContent={item.title}>
              {#snippet child({ props })}
                <a href={resolve(item.url as "/")} {...props}>
                  <Icon icon={item.icon}/>
                  <span class="text-[1.5rem]">{item.title}</span>
                </a>
              {/snippet}
            </Sidebar.MenuButton>
            {#if item.items?.length}
              <Collapsible.Trigger>
                {#snippet child({ props })}
                  <Sidebar.MenuAction
                    {...props}
                    class="data-[state=open]:rotate-90"
                  >
                    <Icon icon="line-md:chevron-right" />
                    <span class="sr-only">Toggle</span>
                  </Sidebar.MenuAction>
                {/snippet}
              </Collapsible.Trigger>
              <Collapsible.Content class="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                <Sidebar.MenuSub>
                  {#each item.items as subItem (subItem.title)}
                    <Sidebar.MenuSubItem>
                      <Sidebar.MenuSubButton>
                        {#snippet child({ props })}
                          <a href={resolve(subItem.url as "/")} {...props}>
                            <span class="text-xl">{subItem.title}</span>
                          </a>
                        {/snippet}
                      </Sidebar.MenuSubButton>
                    </Sidebar.MenuSubItem>
                  {/each}
                </Sidebar.MenuSub>
              </Collapsible.Content>
            {/if}
          </Sidebar.MenuItem>
        {/snippet}
      </Collapsible.Root>
    {/each}
  </Sidebar.Menu>
</Sidebar.Group>