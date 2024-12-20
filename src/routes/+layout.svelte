<script lang="ts">
	import '$styles/app.css';
	import { type Snippet } from 'svelte';

	import { HeroContainer } from '$lib/index.js';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>{'test page'}</title>
</svelte:head>
<HeroContainer>
	{@render children?.()}
</HeroContainer>
