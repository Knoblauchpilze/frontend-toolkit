<script lang="ts">
	import { type Snippet } from 'svelte';

	import { FlexContainer } from '$lib/index.js';

	interface Props {
		height?: string;
		children?: Snippet;
	}

	let { height = 'h-1/10', children }: Props = $props();
</script>

<FlexContainer
	vertical={false}
	bgColor={'bg-black'}
	styling="w-full {height} fixed top-0 left-0 text-white"
>
	{@render children?.()}
</FlexContainer>
