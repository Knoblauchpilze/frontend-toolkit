<script lang="ts">
	interface Props {
		text?: string;
	}

	let { text = 'Home' }: Props = $props();
</script>

<h1 class="text-secondary px-12 py-4 text-3xl font-bold italic">{text}</h1>
