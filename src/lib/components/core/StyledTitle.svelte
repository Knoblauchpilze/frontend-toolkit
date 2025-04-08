<script lang="ts">
	interface Props {
		text?: string;
		margins?: boolean;
	}

	let { text = 'Home', margins = true }: Props = $props();

	let marginsStyle = $state('');
	if (margins === true) {
		marginsStyle = 'px-12 py-4';
	}
</script>

<h1 class="text-secondary text-3xl font-bold italic {marginsStyle}">{text}</h1>
