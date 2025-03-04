<script lang="ts">
	import { FlexContainer, FormField, StyledButton, StyledLink, StyledTitle } from '$lib/index.js';

	function onClickInternal() {
		console.log('click');
	}
</script>

<FlexContainer>
	<StyledTitle text="The totocorpsoftwareinc website" />
	<StyledLink
		text="Galactic Sovereign"
		link="https://galactic-sovereign.gasteropo.de"
		showAsButton={true}
	/>
	<StyledLink text="Admin dashboard" link="https://admin.gasteropo.de" showAsButton={true} />

	<form method="POST" action="?/login" class="flex flex-1 flex-col justify-evenly">
		<FormField label="email:" labelId="email" labelStyling="text-secondary">
			<input
				id="email"
				type="text"
				name="email"
				placeholder="Enter your email address"
				required
				value=""
				class="bg-white"
			/>
		</FormField>
		<FormField label="password:" labelId="password" labelStyling="text-secondary">
			<input
				id="password"
				type="text"
				name="password"
				placeholder="Enter your password"
				required
				class="bg-white"
			/></FormField
		>
		<StyledButton text="Login" border={true} onClick={onClickInternal} />
	</form>
</FlexContainer>
