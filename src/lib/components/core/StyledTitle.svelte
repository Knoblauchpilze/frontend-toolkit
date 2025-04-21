<script lang="ts">
	interface Props {
		text?: string;
		textSize?: string;
		margins?: boolean;
		styling?: string;
	}

	let { text = 'Home', textSize = 'text-3xl', margins = true, styling = '' }: Props = $props();

	let marginsStyle = $state('');
	if (margins === true) {
		marginsStyle = 'px-12 py-4';
	}
</script>

<h1 class="text-secondary font-bold italic {textSize} {marginsStyle} {styling}">{text}</h1>
