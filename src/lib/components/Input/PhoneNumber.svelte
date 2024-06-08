<script>
	import { AsYouType, PhoneNumberMatcher, isValidPhoneNumber } from 'libphonenumber-js';
	import { countries } from 'countries-list';
	import Button from '../Button/index.svelte';

	export let value = '';
	export let placeholder = 'Enter phone number';

	let showCountryDropdown = false;
	let countryData = Object.entries(countries).map(([code, country]) => ({
		name: country.name,
		code,
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
			<span class="city-name">
				{#if selectedCountry}
					{selectedCountry.dialCode} {selectedCountry.code}
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
	.select-country {
		@apply border-primary rounded-lg p-2;
	}

	.error {
		@apply border-2 border-solid border-red-500;
	}

	.code-container {
		@apply max-w-[120px] text-black p-2 rounded-md;
	}

	.phone-input-container {
		@apply flex w-full gap-x-2;
	}

	.phone-number-input {
		@apply flex;
	}

	.dial-code {
		padding: 8px;
		background-color: #f2f2f2;
		border: 1px solid #ccc;
		border-right: none; /* visually connects the dial code to the input */
		border-radius: 4px 0 0 4px;
	}

	.flag-icon {
		margin-right: 8px;
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
		@apply p-2 cursor-pointer;
	}

	.city {
		@apply cursor-pointer text-white font-bold min-w-[100px] h-[50px] rounded-full border-primary flex items-center justify-center p-2;
		text-align: center;
	}

	.selected {
		@apply bg-success;
	}

	input {
		@apply outline-none bg-primary rounded-full w-full p-3 text-white font-bold;
	}
</style>
