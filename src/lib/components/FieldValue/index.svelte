<script lang="ts">
	import { onMount } from 'svelte';
	import Switch from '../Switch/index.svelte';
	import Range from '../Range/index.svelte';
	import DropDown from '../DropDown/index.svelte';
	import Select from '../NiceSelect/index.svelte';
	import TextArea from '../TextArea/index.svelte';
	import translate from '../../utils/helpers/translate';

	export let label = 'Custom fieldConfigs';
	export let fieldConfig = null;
	export let field = null;
	export let locale = 'en';
	export let index = 0;
	export let t;

	$: console.log('field ', field, fieldConfig);

	const parseLabel = (label) => {
		if (label.startsWith('+')) {
			return label.slice(1) + '+';
		}

		if (label.startsWith('=')) {
			return label.slice(1);
		}

		return label;
	};
</script>

{#if field}
	{#if fieldConfig?.type === 'text'}
		<TextArea
			{t}
			label={translate(fieldConfig.key, locale)}
			bind:value={field.value}
			bind:errors={field.errors}
			minLength={fieldConfig?.properties?.minLength}
			maxLength={fieldConfig?.properties?.maxLength}
		/>
	{:else if fieldConfig?.properties?.options?.length}
		{#if fieldConfig?.ui === 'nice_select'}
			<Select
				isRequired={fieldConfig.isRequired}
				{t}
				ui={fieldConfig?.ui}
				isMultiSelect={fieldConfig?.properties.isMultiSelect}
				position="horizontal"
				label={translate(fieldConfig.key, locale)}
				labelThumbnail={fieldConfig.thumbnail}
				bind:value={field.value}
				bind:errors={field.errors}
				options={fieldConfig.properties.options.map((option) => ({
					label: parseLabel(option),
					value: option
				}))}
			/>
		{:else}
			<DropDown
				isRequired={fieldConfig.isRequired}
				{t}
				label={translate(fieldConfig.key, locale)}
				isMultiSelect={fieldConfig?.properties.isMultiSelect}
				bind:value={field.value}
				bind:errors={field.errors}
				options={fieldConfig.properties.options.map((option) => ({
					label: parseLabel(option),
					value: option
				}))}
			/>
		{/if}
	{/if}

	{#if fieldConfig?.properties?.range}
		<Range
			isRequired={fieldConfig.isRequired}
			{t}
			label={translate(fieldConfig.key, locale)}
			bind:value={field.value}
			bind:errors={field.errors}
			max={+fieldConfig.properties.range.max}
			min={+fieldConfig.properties.range.min}
			id="basic-slider"
		/>
	{/if}

	{#if fieldConfig.type === 'boolean'}
		<Switch
			isRequired={fieldConfig.isRequired}
			{t}
			label={translate(fieldConfig.key, locale)}
			labelThumbnail={fieldConfig.thumbnail}
			bind:value={field.value}
			bind:errors={field.errors}
		/>
	{/if}

	{#if fieldConfig.type === 'entities'}
		<slot name="entities" idx={index} value={field.value} {fieldConfig} />
	{/if}

	{#if fieldConfig.type === 'custom'}
		<slot name="custom" idx={index} errors={field.errors} value={field.value} {fieldConfig} />
	{/if}
{/if}
