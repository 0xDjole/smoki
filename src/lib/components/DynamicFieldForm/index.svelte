<script lang="ts">
	import Input from '../Input/index.svelte';
	import Switch from '../Switch/index.svelte';
	import Range from '../Range/index.svelte';
	import DropDown from '../DropDown/index.svelte';
	import Select from '../NiceSelect/index.svelte';
	import translateLabel from '../../utils/helpers/translateLabel';

	import { locale } from 'svelte-i18n';

	export let label = 'Custom fieldConfigs';
	export let fieldConfigs = [];
	export let fields = [];

	const parseLabel = (label) => {
		if (label.startsWith('+')) {
			return label.slice(1) + '+';
		}

		if (label.startsWith('=')) {
			return label.slice(1);
		}

		return label;
	};
	$: console.log('field congs ', fieldConfigs);
	$: console.log('field', fields);
</script>

<div class="custom-field-config-body">
	{#each fieldConfigs as fieldConfig, index (fieldConfig.id)}
		<div class="flex gap-x-2">
			<div class="md:p-1 md:px-3 w-full box-border">
				{#if fields[index]}
					{#if fieldConfig?.properties?.options?.length}
						{#if fieldConfig?.ui === 'nice_select'}
							<Select
								ui={fieldConfig?.ui}
								isMultiSelect={fieldConfig?.properties.isMultiSelect}
								position="horizontal"
								label={translateLabel(fieldConfig.label, $locale, fieldConfig.key)}
								labelThumbnail={fieldConfig.thumbnail}
								bind:value={fields[index].value}
								bind:errors={fields[index].errors}
								options={fieldConfig.properties.options.map((option) => ({
									label: parseLabel(option),
									value: option
								}))}
							/>
						{:else}
							<DropDown
								label={fieldConfig.key}
								isMultiSelect={fieldConfig?.properties.isMultiSelect}
								bind:value={fields[index].value}
								bind:errors={fields[index].errors}
								options={fieldConfig.properties.options.map((option) => ({
									label: parseLabel(option),
									value: option
								}))}
							/>
						{/if}
					{/if}

					{#if fieldConfig?.properties?.isCustomInputAllowed}
						<Input
							label={!fieldConfig?.properties?.options?.length &&
								translateLabel(fieldConfig.label, $locale, fieldConfig.key)}
							labelThumbnail={fieldConfig.thumbnail}
							bind:value={fields[index].value}
							bind:errors={fields[index].errors}
							type={fieldConfig.type}
							kind="primary"
							placeholder="please_enter"
						/>
					{/if}

					{#if fieldConfig?.properties?.range}
						<div class={`${fieldConfig?.properties?.isCustomInputAllowed ? 'mt-3' : ''}`}>
							<Range
								label={fieldConfig?.properties?.isCustomInputAllowed
									? null
									: translateLabel(fieldConfig.label, $locale, fieldConfig.key)}
								bind:value={fields[index].value}
								max={+fieldConfig.properties.range.max}
								min={+fieldConfig.properties.range.min}
								id="basic-slider"
							/>
						</div>
					{/if}

					{#if fieldConfig.type === 'boolean'}
						<Switch
							label={translateLabel(fieldConfig.label, $locale, fieldConfig.key)}
							labelThumbnail={fieldConfig.thumbnail}
							bind:value={fields[index].value}
							bind:errors={fields[index].errors}
						/>
					{/if}

					{#if fieldConfig.type === 'entities'}
						<slot name="entities" idx={index} value={fields[index].value} {fieldConfig} />
					{/if}

					{#if fieldConfig.type === 'custom'}
						<slot name="custom" idx={index} value={fields[index].value} {fieldConfig} />
					{/if}
				{/if}
			</div>
		</div>
	{/each}
</div>

<style type="text/postcss">
	.custom-field-config-body {
		@apply flex flex-col rounded-md p-2 gap-y-2 w-full h-min;
	}
</style>
