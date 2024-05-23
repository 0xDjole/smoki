<script lang="ts">
	import Switch from '../Switch/index.svelte';
	import Options from './Options.svelte';
	import Range from './Range.svelte';
	import DropDown from '../DropDown/index.svelte';
	import Label from '../Label.svelte';
	import Button from '../Button/index.svelte';

	export let label = 'Custom fields';
	export let value;
	export let errors = [];
	export let fieldType;
	export let addEntity = () => {};

	const propertyTypes = {
		text: {
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
			isCustomInputAllowed: true,
			isOption: true,
			isRange: false
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
			isCustomInputAllowed: true,
			isOption: true,
			isRange: true
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
			isCustomInputAllowed: true,
			isOptionFieldType: true,
			isRange: true
		},
		items: {
			operations: [],
			isCustomInputAllowed: false,
			isOptionFieldType: false,
			isRange: false
		}
	};

	console.log(value);
	$: if (!value) {
		value = {
			properties: {}
		};
	}
</script>

{#if propertyTypes[fieldType]}
	<Label {label} {errors} />
	<div class="properties">
		{#if propertyTypes[fieldType].operations.length}
			<DropDown
				label="Operation"
				bind:value={value.properties.operation}
				options={propertyTypes[fieldType].operations}
			/>
		{/if}

		{#if propertyTypes[fieldType].isCustomInputAllowed}
			<Switch label="Is custom input allowed" bind:value={value.properties.isCustomInputAllowed} />
		{/if}

		{#if fieldType === 'items'}
			<Button
				onClick={() => {
					addEntity(value);
				}}>Add item</Button
			>

			{#if value?.properties?.ids?.length}
				<Switch label="Is multiselect" bind:value={value.properties.isMultiSelect} />
			{/if}
		{/if}
		{#if propertyTypes[fieldType].isOption}
			<Options label="Options" type={fieldType} bind:options={value.properties.options} />

			{#if value?.properties?.options?.length}
				<Switch label="Is multiselect" bind:value={value.properties.isMultiSelect} />
			{/if}
		{/if}

		{#if propertyTypes[fieldType].isRange}
			<Range label="Range" bind:range={value.properties.range} />
		{/if}
	</div>
{/if}

<style type="text/postcss">
	.properties {
		@apply flex flex-col gap-y-2 p-3;
	}
</style>
