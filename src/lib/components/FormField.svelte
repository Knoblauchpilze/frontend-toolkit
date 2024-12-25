<script lang="ts">
	import { type Snippet } from 'svelte';

	import { FlexContainer } from '$lib/index.js';

	interface Props {
		label?: string;
		labelId: string;
		styling?: string;
		children?: Snippet;
	}

	let { label = 'My label', labelId, styling = 'text-primary', children }: Props = $props();
</script>

<FlexContainer extensible={false} align={'stretch'} {styling}>
	<label for={labelId}>{label}</label>
	<div class="text-primary">
		{@render children?.()}
	</div>
</FlexContainer>
