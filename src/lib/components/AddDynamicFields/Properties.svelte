<script lang="ts">
	import { run } from 'svelte/legacy';

	import Switch from '../Switch/index.svelte';
	import Options from './Options.svelte';
	import Range from './Range.svelte';
	import DropDown from '../DropDown/index.svelte';
	import Input from '../Input/index.svelte';
	import Label from '../Label.svelte';
	import Button from '../Button/index.svelte';

	interface Props {
		label?: string;
		value: any;
		errors?: any;
		fieldType: any;
		addEntity: any;
		t: any;
		propertyTypes: any;
		entities?: import('svelte').Snippet<[any]>;
	}

	let {
		label = 'Custom fields',
		value = $bindable(),
		errors = $bindable([]),
		fieldType,
		addEntity,
		t,
		propertyTypes,
		entities
	}: Props = $props();

	run(() => {
		if (!value.properties && fieldType) {
			value.properties = propertyTypes[fieldType].defaultProperties;
		}
	});
</script>

{#if propertyTypes[fieldType] && value.properties}
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
				{@render entities?.({ value: value.properties })}

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

<style type="text/postcss">
	.properties {
		@apply flex flex-col gap-y-2 p-3;
	}
	.entity {
		@apply text-white font-bold;
	}
</style>
