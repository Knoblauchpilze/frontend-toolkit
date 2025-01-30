<script lang="ts">
	interface Props {
		text?: string;
		enabled?: boolean;
	}

	let { text = 'Click me', enabled = true }: Props = $props();
</script>

{#if enabled}
	<button class="bg-primary text-secondary hover:bg-primary-hover rounded-[8px] px-12 py-4"
		>{text}</button
	>
{:else}
	<!-- https://stackoverflow.com/questions/34684467/dont-redirect-on-button-click-with-css -->
	<button disabled class="bg-primary-selected text-secondary rounded-[8px] px-12 py-4"
		>{text}</button
	>
{/if}
