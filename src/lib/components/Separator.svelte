<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		orientation?: 'horizontal' | 'vertical';
		class?: string;
	}

	let { orientation = 'horizontal', class: className }: Props = $props();
</script>

<!-- Exists so nothing reaches for a bare <hr> with ad-hoc classes. -->
<div
	role="separator"
	aria-orientation={orientation}
	class={cn('bg-border', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', className)}
></div>
