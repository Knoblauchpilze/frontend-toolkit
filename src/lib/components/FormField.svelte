<script lang="ts">
	import { type Snippet } from 'svelte';

	import { FlexContainer } from '$lib/index.js';

	interface Props {
		label?: string;
		labelId: string;
		labelStyling?: string;
		children?: Snippet;
	}

	let { label = 'My label', labelId, labelStyling = 'text-primary', children }: Props = $props();
</script>

<FlexContainer extensible={false} align="stretch" styling="text-primary">
	<label for={labelId} class={labelStyling}>{label}</label>
	{@render children?.()}
</FlexContainer>
