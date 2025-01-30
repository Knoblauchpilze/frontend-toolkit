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
		<a href={link} class="bg-primary-selected text-secondary rounded-[8px] px-12 py-4">
			{text}
		</a>
	{:else}
		<a
			href={link}
			class="bg-primary text-secondary hover:bg-primary-hover rounded-[8px] px-12 py-4"
		>
			{text}
		</a>
	{/if}
{:else}
	<a class="text-secondary hover:text-secondary-hover" href={link}>{text}</a>
{/if}
