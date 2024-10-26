<script lang="ts">
	import MultiSelect from './MultiSelect.svelte';
	import SingleSelect from './SingleSelect.svelte';

	interface Props {
		value?: any;
		disabled?: boolean;
		options?: any;
		label?: string;
		labelThumbnail?: any;
		errors?: any;
		position?: string;
		ui?: string;
		isMultiSelect?: boolean;
		t: any;
		isRequired?: boolean;
	}

	let {
		value = $bindable(null),
		disabled = false,
		options = [],
		label = '',
		labelThumbnail = null,
		errors = $bindable([]),
		position = 'vertical',
		ui = 'default',
		isMultiSelect = false,
		t,
		isRequired = false
	}: Props = $props();
</script>

{#if isMultiSelect}
	<MultiSelect
		{isRequired}
		{t}
		{disabled}
		bind:values={value}
		{options}
		{position}
		{errors}
		{label}
		{labelThumbnail}
	/>
{:else}
	<SingleSelect
		{isRequired}
		{t}
		{disabled}
		bind:value
		{options}
		{position}
		{errors}
		{label}
		{labelThumbnail}
	/>
{/if}
