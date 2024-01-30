<script lang="ts">
	export let values = [];
	export let options = [];
	export let label = '';
	export let errors = [];
	export let className = '';

	const selectOption = (optionValue) => {
		const isSelected = values.includes(optionValue);
		if (isSelected) {
			values = values.filter((value) => value !== optionValue);
		} else {
			values = [...values, optionValue];
		}
	};
</script>

<div>
	{#if label}
		<label class:label-error={errors.length} for={label} class="label">{label}</label>
	{/if}

	<div class={className}>
		{#each options as option}
			<div
				on:click={() => selectOption(option.value)}
				class="option bg-secondary border-primary {values?.includes(option.value)
					? 'selected'
					: ''}"
			>
				{option.label}
			</div>
		{/each}
	</div>
</div>

<style type="text/postcss">
	.option {
		@apply flex justify-center items-center cursor-pointer p-2 my-2 rounded-xl font-bold text-lg transition-all duration-200 ease-in-out shadow-sm text-secondary min-w-[60px];
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
