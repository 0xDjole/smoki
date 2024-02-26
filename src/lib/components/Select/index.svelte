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

	const selectOption = (optionValue) => {
		showModal = false;
	};

	$: selectedOption = options.find((option) => option.value === value);
	$: console.log('show ', showModal);
</script>

<div class="select">
	<div class="select-button" on:click={() => (showModal = !showModal)}>
		<span>{selectedOption?.label || $_('choose')}</span>

		<SvgIcon data={DropDownIcon} width={'25px'} size={'25px'} color={'white'} />
	</div>
	{#if showModal === true}
		<div class="options">
			{#each options as option}
				<div
					class="item"
					class:selected={option.value === value}
					on:click={() => {
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
		@apply relative;
	}

	.select-button {
		@apply cursor-pointer flex w-full min-w-[80px] p-1 bg-accent text-white rounded-lg border-2 border-secondary border-solid font-semibold text-lg outline-none gap-x-2 justify-between;
	}

	.options {
		@apply flex flex-col w-full absolute top-10 left-0 rounded-md bg-secondary;
	}
	.item {
		@apply cursor-pointer p-1 w-full;
	}
	.selected {
		@apply bg-accent p-1 rounded-md;
	}
</style>
