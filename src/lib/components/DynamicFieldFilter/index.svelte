<script lang="ts">
	import Input from '../Input/index.svelte';
	import Switch from '../Switch/index.svelte';
	import Range from '../Range/index.svelte';
	import DropDown from '../DropDown/index.svelte';
	import Select from '../NiceSelect/index.svelte';

	export let label = 'Custom fields';
	export let fieldConfigs = [];
	export let fields = [];

	const parseLabel = (label) => {
		console.log('label ', label);
		if (label.startsWith('+')) {
			return label.slice(1) + '+';
		}

		if (label.startsWith('=')) {
			console.log('evo ga');
			return label.slice(1);
		}

		return label;
	};
</script>

<div class="custom-field-body">
	{#each fieldConfigs as field, index}
		<div class="md:p-1 md:px-6 w-full box-border">
			{#if field?.properties?.options?.length}
				{#if field?.ui === 'nice_select'}
					<Select
						ui={field?.ui}
						isMultiSelect={field?.properties.isMultiSelect}
						position="horizontal"
						label={field.key}
						bind:value={fields[index].value}
						options={field.properties.options.map((option) => ({
							label: parseLabel(option),
							value: option
						}))}
					/>
				{:else}
					<DropDown
						label={field.key}
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
					label={!field?.properties?.options?.length && field.key}
					bind:errors={field.errors}
					bind:value={fields[index].value}
					type={field.type}
					kind="primary"
					placeholder="Please enter"
				/>
			{/if}

			{#if field.properties.range}
				<div class={`${field?.properties?.isCustomInputAllowed ? 'mt-3' : ''}`}>
					<Range
						label={field?.properties?.isCustomInputAllowed ? null : field.key}
						bind:value={fields[index].value}
						max={+field.properties.range.max}
						min={+field.properties.range.min}
						id="basic-slider"
					/>
				</div>
			{/if}

			{#if field.type === 'boolean'}
				<Switch label={field.key} bind:value={fields[index].value} />
			{/if}
		</div>
	{/each}
</div>

<style type="text/postcss">
	.custom-field-body {
		@apply flex flex-col rounded-md p-2 gap-y-2 w-full h-full;
	}
</style>
