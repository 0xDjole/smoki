<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import DropDownIcon from '../../utils/icons/dropdown.svg?raw';
	import SvgIcon from '../SvgIcon.svelte';

	interface Props {
		value: string | number | boolean;
		defaultOption: any;
		options?: any;
		label?: string;
		labelThumbnail?: any;
		t: any;
		errors?: any;
		onChange?: any;
	}

	let {
		value = $bindable(),
		defaultOption,
		options = [],
		label = '',
		labelThumbnail = null,
		t,
		errors = $bindable([]),
		onChange = (value) => {}
	}: Props = $props();

	let showModal = $state(false);

	let selectedOption = $derived(options.find((option) => option.value === value));
</script>

<div class="select">
	<button class="select-button" onclick={preventDefault(() => (showModal = !showModal))}>
		<span class="button-text">{$t(selectedOption?.label || 'choose')}</span>
		<div class="dropdown-svg">
			<SvgIcon
				data={DropDownIcon}
				width="20px"
				height="20px"
				color={'var(--secondary-text-color)'}
			/>
		</div>
	</button>
	{#if showModal}
		<div class="options">
			{#each options as option}
				<div
					class="item"
					class:selected={option.value === value}
					onclick={preventDefault(() => {
						showModal = false;
						value = option.value;
						onChange(option.value);
					})}
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
	}

	.select-button {
		@apply text-sm flex w-full p-1 text-secondary font-semibold outline-none gap-x-2 items-center justify-between z-0;
	}

	.button-text {
		@apply ml-3 flex-1 text-center;
	}

	.dropdown-svg {
		flex-shrink: 0; /* Prevent the icon from shrinking */
	}

	.options {
		@apply flex flex-col w-full absolute top-10 left-0 rounded-md bg-secondary max-h-[300px] overflow-scroll border-primary z-10;
	}
	.item {
		@apply cursor-pointer p-2 w-full text-base text-primary font-bold;
	}
	.selected {
		@apply bg-accent p-1 rounded-md text-white;
	}
</style>
