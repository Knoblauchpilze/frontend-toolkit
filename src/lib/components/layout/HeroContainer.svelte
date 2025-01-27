<script lang="ts">
	import { type Snippet } from 'svelte';

	// https://svelte.dev/docs/kit/packaging#Caveats
	import { FlexContainer } from '$lib/index.js';

	interface Props {
		width?: string;
		height?: string;
		bgColor?: string;
		align?: string;
		bgOverlay?: string;
		children?: Snippet;
	}

	let {
		width = 'w-3/4',
		height = 'h-3/4',
		bgColor = 'bg-primary',
		bgOverlay = 'bg-overlay',
		align = 'center',
		children
	}: Props = $props();

	let style = $derived(
		'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ' +
			width +
			' ' +
			height +
			' rounded-lg'
	);
</script>

<div class="relative h-full {bgColor} bg-cover bg-center bg-no-repeat">
	<FlexContainer bgColor={bgOverlay} {align} styling={style}>
		{@render children?.()}
	</FlexContainer>
</div>

<style lang="postcss">
	/* https://stackoverflow.com/questions/19026884/flexbox-center-horizontally-and-vertically */
	/* https://stackoverflow.com/questions/71760177/styling-the-body-element-in-svelte */
	:global(body),
	:global(html) {
		height: 100%;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
