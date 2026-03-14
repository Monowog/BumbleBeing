<script lang="ts">
  import { page } from '$app/stores';
  import * as Breadcrumb from "$lib/components/ui/breadcrumb";

  const pathnames = $derived(
    $page.url.pathname.split('/').filter(Boolean)
  );

  const formatLabel = (str: string) => 
    str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
</script>

<Breadcrumb.Root class="flex-row flex-nowrap">
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>

    {#each pathnames as path, i (pathnames[i])}
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        {#if i === pathnames.length - 1}
          <Breadcrumb.Page>{formatLabel(path)}</Breadcrumb.Page>
        {:else}
          {@const href = "/" + pathnames.slice(0, i + 1).join('/')}
          <Breadcrumb.Link {href}>
            {formatLabel(path)}
          </Breadcrumb.Link>
        {/if}
      </Breadcrumb.Item>
    {/each}
  </Breadcrumb.List>
</Breadcrumb.Root>