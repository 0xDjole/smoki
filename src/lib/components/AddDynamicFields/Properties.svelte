<script lang="ts">
	import Switch from '$lib/utils/components/Switch/index.svelte';
	import Options from '$lib/utils/components/AddDynamicFields/Options.svelte';
	import Range from '$lib/utils/components/AddDynamicFields/Range.svelte';

	export let label = 'Custom fields';
	export let value;
	export let errors = [];
</script>

{#if label}
	<label class:label-error={errors.length} for={label} class="label">{label}</label>
{/if}

<div class="properties">
	<Switch label="Is custom input allowed" bind:value={value.isCustomInputAllowed} />

	<Switch label="Is multiselect" bind:value={value.isMultiSelect} />

	<Options label="Options" bind:options={value.options} />

	<Range label="Range" bind:range={value.range} />
</div>

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

	.label {
		@apply text-primary text-2xl mb-2 font-bold;
	}

	.label-error {
		@apply text-error;
	}
</style>
