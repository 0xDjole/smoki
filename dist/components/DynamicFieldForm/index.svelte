<script>import Input from '../Input/index.svelte';
import Switch from '../Switch/index.svelte';
import Range from '../Range/index.svelte';
import DropDown from '../DropDown/index.svelte';
import Select from '../NiceSelect/index.svelte';
import translateLabel from '../../utils/helpers/translateLabel';
import { locale } from 'svelte-i18n';
export let label = 'Custom fields';
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
</script>

<div class="custom-field-body">
	{#each fieldConfigs as field, index}
		<div class="flex gap-x-2">
			<div class="md:p-1 md:px-6 w-full box-border">
				{#if field?.properties?.options?.length}
					{#if field?.ui === 'nice_select'}
						<Select
							ui={field?.ui}
							isMultiSelect={field?.properties.isMultiSelect}
							position="horizontal"
							label={translateLabel(field.label, $locale, field.key)}
							labelThumbnail={field.thumbnail}
							bind:value={fields[index].value}
							options={field.properties.options.map((option) => ({
								label: parseLabel(option),
								value: option
							}))}
						/>
					{:else}
						<DropDown
							label={field.key}
							isMultiSelect={field?.properties.isMultiSelect}
							bind:value={fields[index].value}
							options={field.properties.options.map((option) => ({
								label: parseLabel(option),
								value: option
							}))}
						/>
					{/if}
				{/if}

				{#if field?.properties?.isCustomInputAllowed}
					<Input
						label={!field?.properties?.options?.length &&
							translateLabel(field.label, $locale, field.key)}
						labelThumbnail={field.thumbnail}
						bind:errors={field.errors}
						bind:value={fields[index].value}
						type={field.type}
						kind="primary"
						placeholder="Please enter"
					/>
				{/if}

				{#if field?.properties?.range}
					<div class={`${field?.properties?.isCustomInputAllowed ? 'mt-3' : ''}`}>
						<Range
							label={field?.properties?.isCustomInputAllowed
								? null
								: translateLabel(field.label, $locale, field.key)}
							bind:value={fields[index].value}
							max={+field.properties.range.max}
							min={+field.properties.range.min}
							id="basic-slider"
						/>
					</div>
				{/if}

				{#if field.type === 'boolean'}
					<Switch
						label={translateLabel(field.label, $locale, field.key)}
						labelThumbnail={field.thumbnail}
						bind:value={fields[index].value}
					/>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.custom-field-body {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    row-gap: 0.5rem;
    border-radius: 0.375rem;
    padding: 0.5rem
}</style>
