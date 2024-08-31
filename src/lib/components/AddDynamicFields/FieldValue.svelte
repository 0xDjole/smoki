<script lang="ts">
	import Switch from '../Switch/index.svelte';
	import Range from '../Range/index.svelte';
	import DropDown from '../DropDown/index.svelte';
	import Select from '../NiceSelect/index.svelte';
	import TextArea from '../TextArea/index.svelte';
	import Map from '../Map/index.svelte';
	import RichText from '../RichText/index.svelte';
	import Label from '../Label.svelte';
	import translate from '../../utils/helpers/translate';
	import { LocalizedText } from '../..';

	export let label = 'Custom fieldConfigs';
	export let fieldConfig = null;
	export let fieldValue = null;
	export let locale = 'en';
	export let index = 0;
	export let t;

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

{#if fieldConfig}
	<Label {t} label="Default value" />

	{#if fieldConfig?.type === 'text'}
		{#if fieldConfig?.ui === 'html'}
			<LocalizedText
				{t}
				label={translate(fieldConfig.key, locale)}
				bind:labels={fieldValue}
				type="html"
				errors={[]}
			/>
		{:else}
			<TextArea
				{t}
				label={translate(fieldConfig.key, locale)}
				bind:value={fieldValue}
				errors={[]}
				minLength={fieldConfig?.properties?.minLength}
				maxLength={fieldConfig?.properties?.maxLength}
			/>
		{/if}
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
				bind:value={fieldValue}
				errors={[]}
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
				bind:value={fieldValue}
				errors={[]}
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
			bind:value={fieldValue}
			errors={[]}
			max={+fieldConfig.properties.range.max}
			min={+fieldConfig.properties.range.min}
		/>
	{/if}

	{#if fieldConfig.type === 'boolean'}
		<Switch
			isRequired={fieldConfig.isRequired}
			{t}
			label={translate(fieldConfig.key, locale)}
			labelThumbnail={fieldConfig.thumbnail}
			bind:value={fieldValue}
			errors={[]}
		/>
	{/if}

	{#if fieldConfig.type === 'geo_location'}
		<Map label={translate(fieldConfig.key, locale)} bind:value={fieldValue} />
	{/if}

	{#if fieldConfig.type === 'entities'}
		<slot name="entities" idx={index} value={fieldValue} {fieldConfig} />
	{/if}

	{#if fieldConfig.type === 'custom'}
		<slot name="custom" idx={index} errors={[]} value={fieldValue} {fieldConfig} />
	{/if}
{/if}
