<script>export let value;
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

<style>
	.select {

    width: 100%;

    border-radius: 0.5rem;

    background-color: var(--secondary-background-color);

    padding: 0.5rem;

    font-size: 1.5rem;

    line-height: 2rem;

    font-weight: 600;

    color: rgb(255 255 255 / var(--tw-text-opacity));

    --tw-text-opacity: 0.8;

    outline: 2px solid transparent;

    outline-offset: 2px;

    border-color: var(--primary-border-color);

    border-width: 1px;

    border-style: solid
}

	.label {

    margin-bottom: 0.5rem;

    font-size: 1.5rem;

    line-height: 2rem;

    font-weight: 700;

    --tw-text-opacity: 1;

    color: rgb(255 255 255 / var(--tw-text-opacity))
}

	.label-error {

    color: var(--error-background-color)
}</style>
