<script lang="ts">
	import DropDownIcon from '../../utils/icons/dropdown.svg?raw';
	import SvgIcon from '../SvgIcon.svelte';

	export let value: string | number | boolean;
	export let defaultOption;
	export let options = [];
	export let label = '';
	export let labelThumbnail = null;
	export let t;

	export let errors = [];
	export let onChange = (value) => {};

	let showModal = false;

	$: selectedOption = options.find((option) => option.value === value);
</script>

<div class="select">
	<button class="select-button" on:click|preventDefault={() => (showModal = !showModal)}>
		<span class="button-text">{$t(selectedOption?.label || 'choose')}</span>
		<div class="dropdown-svg">
			<SvgIcon data={DropDownIcon} width="20px" height="20px" color="white" />
		</div>
	</button>
	{#if showModal}
		<div class="options">
			{#each options as option}
				<div
					class="item"
					class:selected={option.value === value}
					on:click|preventDefault={() => {
						showModal = false;
						value = option.value;
						onChange(option.value);
					}}
				>
					{option.label}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style type="text/postcss">
	.select {
		@apply flex relative w-full;
		z-index: 1;
	}

	.select-button {
		@apply text-base flex w-full p-1 bg-accent text-white rounded-lg font-semibold md:text-lg outline-none gap-x-2 items-center justify-between;
	}

	.button-text {
		@apply ml-3 flex-1 text-center;
	}

	.dropdown-svg {
		flex-shrink: 0; /* Prevent the icon from shrinking */
	}

	.options {
		@apply flex flex-col w-full absolute top-10 left-0 rounded-md bg-secondary max-h-[300px] overflow-scroll border-primary;
	}
	.item {
		@apply cursor-pointer p-2 w-full text-base text-primary font-bold;
	}
	.selected {
		@apply bg-accent p-1 rounded-md text-white;
	}
</style>
