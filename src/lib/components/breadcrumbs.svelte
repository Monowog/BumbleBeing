<script lang="ts">
  import { page } from '$app/stores';
  import * as Breadcrumb from "$lib/components/ui/breadcrumb";

  let pathnames = $derived(
    $page.url.pathname.split('/').filter(Boolean)
  );

  if($page.error) pathnames = ["Error"];

  const formatLabel = (str: string) => {
    let tokens = str.split("-");
    tokens = tokens.map(token => {
      return token.charAt(0).toUpperCase() + token.slice(1);
    });
    return tokens.join(" ");
  };
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