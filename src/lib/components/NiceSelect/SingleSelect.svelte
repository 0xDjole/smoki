<script lang="ts">
	import Label from '../Label.svelte';

	export let value = null;
	export let options = [];
	export let label = '';
	export let errors = [];
	export let disabled = false;
	export let position = 'vertical';
	export let ui = 'default';
	export let isMultiSelect = false;
	export let labelThumbnail = null;

	const selectOption = (optionValue) => {
		if (!disabled) {
			const isSelected = value === optionValue;
			value = isSelected ? null : optionValue;
		}
	};
</script>

<div>
	<Label {label} {labelThumbnail} {errors} />

	<div
		class="list"
		class:list-vertical={position === 'vertical'}
		class:list-horizontal={position === 'horizontal'}
	>
		{#each options as option}
			<div
				on:click|preventDefault={() => selectOption(option.value)}
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
		@apply flex justify-center items-center cursor-pointer p-2 my-2 rounded-xl font-bold text-lg transition-all duration-200 ease-in-out shadow-sm text-secondary hover:opacity-60 min-w-[60px];
	}

	.selected {
		@apply bg-accent text-primary;
	}
</style>
