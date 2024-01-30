<script lang="ts">
	export let value: string | number | boolean;
	export let defaultOption;
	export let options = [];
	export let label = '';
	export let errors = [];
</script>

<div>
	{#if label}
		<label class:label-error={errors.length} for={label} class="label">{label}</label>
	{/if}

	<select class="select" bind:value>
		{#if defaultOption}
			<option>{defaultOption}</option>
		{/if}

		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</div>

<style type="text/postcss">
	.select {
		@apply w-full p-2 bg-secondary text-white rounded-lg border-2 border-secondary border-solid font-semibold text-2xl outline-none
            text-opacity-80;
	}

	.label {
		@apply text-white text-2xl mb-2 font-bold;
	}

	.label-error {
		@apply text-error;
	}
</style>
