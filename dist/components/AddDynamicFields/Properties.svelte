<script>import Switch from '../Switch/index.svelte';
import Options from './Options.svelte';
import Range from './Range.svelte';
import DropDown from '../DropDown/index.svelte';
import Input from '../Input/index.svelte';
import Label from '../Label.svelte';
import Button from '../Button/index.svelte';
export let label = 'Custom fields';
export let value;
export let errors = [];
export let fieldType;
export let addEntity;
export let t;
const propertyTypes = {
    text: {
        operations: [],
        defaultProperties: {},
        isOption: false,
        isRange: false
    },
    select: {
        operations: [
            { label: 'Greater than', value: 'plus' },
            { label: 'Less than', value: 'minus' },
            { label: 'Less than or equal', value: 'less_than_or_equal' },
            { label: 'Greater than or equal', value: 'greater_than_or_equal' },
            { label: 'Equals', value: 'equals' },
            { label: 'Greater than', value: 'greater_than' },
            { label: 'Less than', value: 'less_than' },
            { label: 'Contains', value: 'contains' },
            { label: 'Range', value: 'range' }
        ],
        isOption: true,
        isRange: false,
        defaultProperties: {}
    },
    number: {
        operations: [
            { label: 'Greater than', value: 'plus' },
            { label: 'Less than', value: 'minus' },
            { label: 'Less than or equal', value: 'less_than_or_equal' },
            { label: 'Greater than or equal', value: 'greater_than_or_equal' },
            { label: 'Equals', value: 'equals' },
            { label: 'Greater than', value: 'greater_than' },
            { label: 'Less than', value: 'less_than' },
            { label: 'Contains', value: 'contains' },
            { label: 'Range', value: 'range' }
        ],
        isOption: true,
        isRange: true,
        defaultProperties: {}
    },
    date: {
        operations: [
            { label: 'Greater than', value: 'plus' },
            { label: 'Less than', value: 'minus' },
            { label: 'Less than or equal', value: 'less_than_or_equal' },
            { label: 'Greater than or equal', value: 'greater_than_or_equal' },
            { label: 'Equals', value: 'equals' },
            { label: 'Greater than', value: 'greater_than' },
            { label: 'Less than', value: 'less_than' },
            { label: 'Contains', value: 'contains' },
            { label: 'Range', value: 'range' }
        ],
        isOptionFieldType: true,
        isRange: true,
        defaultProperties: {}
    },
    entities: {
        operations: [],
        isOptionFieldType: false,
        isRange: false,
        defaultProperties: {}
    }
};
$: if (!value.properties) {
    value.properties = null;
}
</script>

{#if propertyTypes[fieldType]}
	<Label {t} {label} {errors} />
	<div class="properties">
		{#if propertyTypes[fieldType].operations.length}
			<DropDown
				label="Operation"
				bind:value={value.properties.operation}
				options={propertyTypes[fieldType].operations}
			/>
		{/if}

		{#if fieldType === 'text'}
			<Input
				{t}
				label="Min length"
				bind:value={value.properties.minLength}
				type="number"
				kind="primary"
				placeholder="Please enter min length"
			/>

			<Input
				{t}
				label="Max length"
				bind:value={value.properties.maxLength}
				type="number"
				kind="primary"
				placeholder="Please enter max length"
			/>
		{/if}

		{#if fieldType === 'entities'}
			<Button
				onClick={() => {
					addEntity(value);
				}}>Add entity</Button
			>

			{#if value?.properties?.source}
				<slot name="entities" value={value.properties} />

				{#if value?.properties?.entities?.length}
					<Switch {t} label="Is multiselect" bind:value={value.properties.isMultiSelect} />
				{/if}

				<Input
					{t}
					label="Min select"
					bind:value={value.properties.minSelect}
					type="number"
					kind="primary"
					placeholder="Please enter min select"
				/>

				<Input
					{t}
					label="Max select"
					bind:value={value.properties.maxSelect}
					type="number"
					kind="primary"
					placeholder="Please enter max select"
				/>
			{/if}
		{/if}
		{#if propertyTypes[fieldType].isOption}
			<Options {t} label="Options" type={fieldType} bind:options={value.properties.options} />

			{#if value?.properties?.options?.length}
				<Switch {t} label="Is multiselect" bind:value={value.properties.isMultiSelect} />
			{/if}
		{/if}

		{#if propertyTypes[fieldType].isRange}
			<Range {t} label="Range" bind:range={value.properties.range} />
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
	.entity {
    font-weight: 700;
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity))
}</style>
