<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import Label from '../Label.svelte';
	interface Props {
		values?: any;
		options?: any;
		label?: string;
		disabled?: boolean;
		labelThumbnail?: any;
		errors?: any;
		position?: string;
		t: any;
		isRequired?: boolean;
	}

	let {
		values = $bindable([]),
		options = [],
		label = '',
		disabled = false,
		labelThumbnail = null,
		errors = $bindable([]),
		position = 'vertical',
		t,
		isRequired = false
	}: Props = $props();

	const selectOption = (optionValue) => {
		if (!disabled) {
			const isSelected = values.includes(optionValue);
			if (isSelected) {
				values = values.filter((value) => value !== optionValue);
			} else {
				values = [...values, optionValue];
			}
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
				class:selected={values && values.some((value) => value.toString() === option.value)}
				class="option"
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
		@apply flex-row overflow-scroll;
	}

	.list-vertical {
		@apply flex-col;
	}

	.option {
		@apply flex justify-center items-center cursor-pointer p-0.5 md:p-1.5 m-1 rounded-xl font-bold text-base md:text-lg transition-all duration-200 ease-in-out shadow-sm text-secondary border-primary min-w-[100px] bg-secondary;
	}

	.selected {
		@apply bg-accent text-white;
	}
</style>
