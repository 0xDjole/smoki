<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import Label from '../Label.svelte';

	interface Props {
		value?: any;
		options?: any;
		label?: string;
		errors?: any;
		disabled?: boolean;
		position?: string;
		ui?: string;
		isMultiSelect?: boolean;
		labelThumbnail?: any;
		t: any;
		isRequired?: boolean;
	}

	let {
		value = $bindable(null),
		options = [],
		label = '',
		errors = [],
		disabled = false,
		position = 'vertical',
		ui = 'default',
		isMultiSelect = false,
		labelThumbnail = null,
		t,
		isRequired = false
	}: Props = $props();

	const selectOption = (optionValue) => {
		if (!disabled) {
			const isSelected = value === optionValue;
			value = isSelected ? null : optionValue;
		}
	};
</script>

<div>
	<Label {isRequired} {t} {label} {labelThumbnail} {errors} />

	<div
		class="list"
		class:list-vertical={position === 'vertical'}
		class:list-horizontal={position === 'horizontal'}
	>
		{#each options as option}
			<div
				onclick={preventDefault(() => selectOption(option.value))}
				class="option bg-secondary border-primary {value === option.value ? 'selected' : ''}"
			>
				{option.label}
			</div>
		{/each}
	</div>
</div>

<style type="text/postcss">
	.list {
		@apply flex;
	}

	.list-horizontal {
		@apply flex-row;
	}

	.list-vertical {
		@apply flex-col;
	}

	.option {
		@apply flex justify-center items-center cursor-pointer p-2 my-2 rounded-xl font-bold text-lg transition-all duration-200 ease-in-out shadow-sm text-secondary border-primary hover:opacity-60 min-w-[60px];
	}

	.selected {
		@apply bg-accent text-white;
	}
</style>
