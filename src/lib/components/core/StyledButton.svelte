<script lang="ts">
	interface Props {
		text?: string;
		enabled?: boolean;
	}

	let { text = 'Click me', enabled = true }: Props = $props();
</script>

{#if enabled}
	<button class="rounded-[8px] bg-primary px-12 py-4 text-secondary hover:bg-primary-hover"
		>{text}</button
	>
{:else}
	<!-- https://stackoverflow.com/questions/34684467/dont-redirect-on-button-click-with-css -->
	<button disabled class="rounded-[8px] bg-primary-selected px-12 py-4 text-secondary"
		>{text}</button
	>
{/if}
