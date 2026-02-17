<!-- https://svelte.dev/docs/svelte-components -->
<script lang="ts">
	interface Props {
		text?: string;
		link?: string;
		showAsButton?: boolean;
		disabled?: boolean;
	}

	let { text = 'Home', link = '/', showAsButton = false, disabled = false }: Props = $props();
</script>

<!-- https://tailwindcss.com/docs/padding -->
<!-- https://tailwindcss.com/docs/hover-focus-and-other-states -->
{#if showAsButton}
	{#if disabled}
		<!-- https://github.com/sveltejs/eslint-plugin-svelte/issues/1353 -->
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href={link} class="bg-primary-selected text-secondary rounded-lg px-12 py-4">
			{text}
		</a>
	{:else}
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href={link} class="bg-primary text-secondary hover:bg-primary-hover rounded-lg px-12 py-4">
			{text}
		</a>
	{/if}
{:else}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a class="text-secondary hover:text-secondary-hover" href={link}>{text}</a>
{/if}
