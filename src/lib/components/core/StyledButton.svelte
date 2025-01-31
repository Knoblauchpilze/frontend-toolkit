<script lang="ts">
	interface Props {
		text?: string;
		enabled?: boolean;
		border?: boolean;
	}

	let { text = 'Click me', enabled = true, border = false }: Props = $props();

	let borderStyle = $state('');
	if (border === true) {
		borderStyle = 'border-solid border-2 border-secondary ';
	}
	borderStyle += 'rounded-[8px] px-12 py-4';
</script>

{#if enabled}
	<button class="bg-primary text-secondary hover:bg-primary-hover {borderStyle}">{text}</button>
{:else}
	<!-- https://stackoverflow.com/questions/34684467/dont-redirect-on-button-click-with-css -->
	<button disabled class="bg-primary-selected text-secondary {borderStyle}">{text}</button>
{/if}
