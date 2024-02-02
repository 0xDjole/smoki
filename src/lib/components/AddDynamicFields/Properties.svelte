<script lang="ts">
	import Switch from '../Switch/index.svelte';
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
</script>

{#if propertyTypes.includes(fieldType)}
	<Label {label} {errors} />
	<div class="properties">
		<DropDown label="Operation" bind:value={value.operation} options={operationOptions} />

		{#if optionFieldTypes.includes(fieldType)}
			<Options label="Options" type={fieldType} bind:options={value.options} />

			{#if value?.options?.length}
				<Switch label="Is custom input allowed" bind:value={value.isCustomInputAllowed} />

				<Switch label="Is multiselect" bind:value={value.isMultiSelect} />
			{/if}
		{/if}

		{#if rangeFieldTypes.includes(fieldType)}
			<Range label="Range" bind:range={value.range} />
		{/if}
	</div>
{/if}

<style type="text/postcss">
	.properties {
		@apply flex flex-col gap-y-2 p-3;
	}

	.custom-field-body {
		@apply flex flex-col   border-secondary rounded-md p-2 gap-y-2;
	}

	.add-field-body {
		@apply p-3 h-[600px] overflow-y-scroll;
	}

	.field-item {
		@apply flex text-primary font-bold justify-between;
	}

	.fields {
		@apply flex text-primary font-bold gap-2;
	}
</style>
