<script lang="ts">
	interface Props {
		text?: string;
		textSize?: string;
		margins?: boolean;
	}

	let { text = 'Home', textSize = 'text-3xl', margins = true }: Props = $props();

	let marginsStyle = $state('');
	if (margins === true) {
		marginsStyle = 'px-12 py-4';
	}
</script>

<h1 class="text-secondary font-bold italic {textSize} {marginsStyle}">{text}</h1>
