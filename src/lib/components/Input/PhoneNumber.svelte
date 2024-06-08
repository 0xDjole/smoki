<script>
	import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js';
	import { countries } from 'countries-list';
	import Button from '../Button/index.svelte';
	import * as Icon from 'svelte-flags';

	export let value = '';
	export let placeholder = 'Enter phone number';

	let showCountryDropdown = false;
	let countryData = Object.entries(countries).map(([code, country]) => ({
		name: country.name,
		code,
		codeCapital: code.charAt(0).toUpperCase() + code.slice(1).toLowerCase(),
		dialCode: `+${country.phone}`
	}));

	$: selectedCountry = countryData.find((c) => c.code === 'US');
	$: phoneNumber = new AsYouType(selectedCountry.code);

	function formatInput(inputValue) {
		phoneNumber.reset();
		return phoneNumber.input(inputValue);
	}

	function handleInput(event) {
		let final = formatInput(selectedCountry.dialCode + event.target.value);
		value = final;
	}

	const selectCountry = (country) => {
		selectedCountry = country;
		showCountryDropdown = false;
	};

	$: valid = isValidPhoneNumber(value);

	let countrySearchTerm = '';
</script>

{#if selectedCountry}
	<div class="phone-input-container">
		<div
			class="city"
			id="dropdown-content"
			on:click={() => {
				showCountryDropdown = true;
			}}
		>
			<svelte:component this={Icon[selectedCountry.codeCapital]} size="30" />

			<span class="city-name">
				{#if selectedCountry}
					{selectedCountry.dialCode}
					{selectedCountry.code}
				{:else}
					{'Country'}
				{/if}
			</span>
		</div>

		{#if showCountryDropdown && countryData.length > 0}
			<div id="dropdown-content" class="dropdown-content">
				<div class="absolute right-3 top-3">
					<Button
						onClick={() => {
							showCountryDropdown = false;
						}}
						kind="delete"
					/>
				</div>
				<div class="dropdown-city">
					<div class="search-input">
						<input
							class="city-input"
							placeholder={'Enter country'}
							bind:value={countrySearchTerm}
						/>

						<div class="search-button">
							<Button kind="search" />
						</div>
					</div>
				</div>

				<div class="city-list">
					{#each countryData.filter((country) => {
						return !countrySearchTerm || country.name
								.toLowerCase()
								.includes(countrySearchTerm.toLowerCase());
					}) as country}
						<div
							class="city-text"
							class:selected={country.code === selectedCountry?.code}
							on:click={() => selectCountry(country)}
						>
							<div>
								<svelte:component this={Icon[country.codeCapital]} size="30" />
							</div>
							{country.dialCode}

							{country.name}
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<input
			class="phone"
			class:error={!valid}
			type="tel"
			value={phoneNumber.getNumber()}
			on:input={handleInput}
			placeholder={phoneNumber.getCallingCode()}
		/>
	</div>
{/if}

<style type="text/postcss">
	.error {
		@apply border-2 border-solid border-red-500;
	}

	.phone-input-container {
		@apply flex w-full gap-x-2;
	}

	.dropdown-content {
		@apply w-[95%] max-w-[700px] flex flex-col absolute bg-primary border-primary rounded-md text-white font-bold;
		top: 50%; /* Centering vertically */
		left: 50%; /* Centering horizontally */
		transform: translate(-50%, -50%); /* Ensuring it's centered based on its own width and height */
		z-index: 1;
	}

	.dropdown-city {
		@apply flex flex-col items-center w-full p-2;
	}

	.city-list {
		@apply flex flex-col p-2 h-[300px] overflow-y-scroll;
	}

	.search-input {
		@apply relative;
	}

	.search-button {
		@apply absolute top-1.5 right-3;
	}

	.city-name {
		@apply text-ellipsis overflow-hidden text-nowrap;
	}

	.city-text {
		@apply p-2 cursor-pointer flex items-center gap-2;
	}

	.city {
		@apply cursor-pointer text-white font-bold min-w-[125px] h-[50px] rounded-full border-primary flex items-center justify-center;
		text-align: center;
	}

	.selected {
		@apply bg-success;
	}

	input {
		@apply outline-none bg-primary rounded-full w-full p-3 text-white font-bold;
	}

	.flag-icon {
		width: 1.5rem;
		height: 1rem;
		display: inline-block;
		margin-right: 0.5rem;
		background-size: contain;
		background-repeat: no-repeat;
	}
</style>
