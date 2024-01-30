<script>import Switch from '../Switch/index.svelte';
import Options from '../AddDynamicFields/Options.svelte';
import Range from '../AddDynamicFields/Range.svelte';
export let label = 'Custom fields';
export let value;
export let errors = [];
</script>

{#if label}
	<label class:label-error={errors.length} for={label} class="label">{label}</label>
{/if}

<div class="properties">
	<Switch label="Is custom input allowed" bind:value={value.isCustomInputAllowed} />

	<Switch label="Is multiselect" bind:value={value.isMultiSelect} />

	<Options label="Options" bind:options={value.options} />

	<Range label="Range" bind:range={value.range} />
</div>

<style>
	.properties {

    display: flex;

    flex-direction: column;

    row-gap: 0.5rem;

    padding: 0.75rem
}

	.custom-field-body {

    display: flex;

    flex-direction: column;

    row-gap: 0.5rem;

    border-radius: 0.375rem;

    padding: 0.5rem;

    border-color: var(--primary-border-color);

    border-width: 1px;

    border-style: solid
}

	.add-field-body {

    height: 600px;

    overflow-y: scroll;

    padding: 0.75rem
}

	.field-item {

    display: flex;

    justify-content: space-between;

    font-weight: 700;

    color: var(--primary-text-color)
}

	.fields {

    display: flex;

    gap: 0.5rem;

    font-weight: 700;

    color: var(--primary-text-color)
}

	.label {

    margin-bottom: 0.5rem;

    font-size: 1.5rem;

    line-height: 2rem;

    font-weight: 700;

    color: var(--primary-text-color)
}

	.label-error {

    color: var(--error-background-color)
}</style>
