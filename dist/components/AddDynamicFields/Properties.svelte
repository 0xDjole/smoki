<script>import Switch from '../Switch/index.svelte';
import Options from './Options.svelte';
import Range from './Range.svelte';
import DropDown from '../DropDown/index.svelte';
import Label from '../Label.svelte';
export let label = 'Custom fields';
export let value;
export let errors = [];
export let fieldType;
const rangeFieldTypes = ['number', 'date'];
const optionFieldTypes = ['text', 'number', 'date'];
const propertyTypes = ['text', 'number', 'date'];
const operationOptions = [
    { label: 'Greater than', value: 'plus' },
    { label: 'Less than', value: 'minus' },
    { label: 'Less than or equal', value: 'less_than_or_equal' },
    { label: 'Greater than or equal', value: 'greater_than_or_equal' },
    { label: 'Equals', value: 'equals' },
    { label: 'Greater than', value: 'greater_than' },
    { label: 'Less than', value: 'less_than' },
    { label: 'Contains', value: 'contains' },
    { label: 'Range', value: 'range' }
];
$: if (propertyTypes.includes(fieldType) && !value) {
    value = {};
}
</script>

{#if propertyTypes.includes(fieldType)}
	<Label {label} {errors} />
	<div class="properties">
		<DropDown label="Operation" bind:value={value.operation} options={operationOptions} />

		<Switch label="Is custom input allowed" bind:value={value.isCustomInputAllowed} />

		{#if optionFieldTypes.includes(fieldType)}
			<Options label="Options" type={fieldType} bind:options={value.options} />

			{#if value?.options?.length}
				<Switch label="Is multiselect" bind:value={value.isMultiSelect} />
			{/if}
		{/if}

		{#if rangeFieldTypes.includes(fieldType)}
			<Range label="Range" bind:range={value.range} />
		{/if}
	</div>
{/if}

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
}</style>
