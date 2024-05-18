<script lang="ts">
	import DropDownIcon from '../../utils/icons/dropdown.svg?raw';
	import { _ } from 'svelte-i18n';
	import SvgIcon from '../SvgIcon.svelte';

	export let value: string | number | boolean;
	export let defaultOption;
	export let options = [];
	export let label = '';
	export let labelThumbnail = null;

	export let errors = [];

	let showModal = false;

	$: selectedOption = options.find((option) => option.value === value);
</script>

<div class="select">
	<button class="select-button" on:click|preventDefault={() => (showModal = !showModal)}>
		<span>{selectedOption?.label || $_('choose')}</span>

		<SvgIcon data={DropDownIcon} width={'20px'} size={'20px'} color={'white'} />
	</button>
	{#if showModal === true}
		<div class="options">
			{#each options as option}
				<div
					class="item"
					class:selected={option.value === value}
					on:click|preventDefault={() => {
						showModal = false;
						value = option.value;
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
		@apply flex relative;
		z-index: 1;
	}

	.select-button {
		@apply text-base flex w-full p-1 bg-accent text-white rounded-lg border-2 border-secondary border-solid font-semibold md:text-lg outline-none gap-x-2 justify-between items-center;
	}

	.options {
		@apply flex flex-col w-full absolute top-10 left-0 rounded-md bg-secondary;
	}
	.item {
		@apply cursor-pointer p-1 w-full text-base;
	}
	.selected {
		@apply bg-accent p-1 rounded-md;
	}
</style>
