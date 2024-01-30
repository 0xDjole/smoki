<script lang="ts">
	import MultiSelect from './MultiSelect.svelte';
	export let value = null;
	export let options = [];
	export let label = '';
	export let errors = [];
	export let className = '';
	export let ui = 'default';
	export let isMultiSelect = false;

	const selectOption = (optionValue) => {
		const isSelected = value === optionValue;
		value = isSelected ? null : optionValue;
	};
</script>

{#if isMultiSelect}
	<MultiSelect bind:values={value} {options} {className} {errors} {label} />
{:else}
	<div>
		{#if label}
			<label class:label-error={errors.length} for={label} class="label">{label}</label>
		{/if}

		<div class={className}>
			{#each options as option}
				<div
					on:click={() => selectOption(option.value)}
					class="option bg-secondary border-primary {value === option.value ? 'selected' : ''}"
				>
					{option.label}
				</div>
			{/each}
		</div>
	</div>
{/if}

<style type="text/postcss">
	.option {
		@apply flex justify-center items-center cursor-pointer p-2 my-2 rounded-xl font-bold text-lg transition-all duration-200 ease-in-out shadow-sm text-secondary hover:opacity-60 min-w-[60px];
	}

	.selected {
		@apply bg-accent text-primary;
	}

	.label {
		@apply text-primary text-2xl mb-2 font-bold;
	}

	.label-error {
		@apply text-error;
	}
</style>
