<script lang="ts">
	import MultiDropDown from './MultiDropDown.svelte';
	import SingleDropDown from './SingleDropDown.svelte';

	interface Props {
		value?: any;
		options?: any;
		label?: string;
		labelThumbnail?: any;
		errors?: any;
		isMultiSelect?: boolean;
		t: any;
		isRequired?: boolean;
		onSelect?: any;
	}

	let {
		value = $bindable(null),
		options = [],
		label = '',
		labelThumbnail = null,
		errors = $bindable([]),
		isMultiSelect = false,
		t,
		isRequired = false,
		onSelect = (value) => {}
	}: Props = $props();
</script>

{#if isMultiSelect}
	<MultiDropDown
		{onSelect}
		{isRequired}
		bind:values={value}
		{options}
		{errors}
		{label}
		{labelThumbnail}
		{t}
	/>
{:else}
	<SingleDropDown
		{onSelect}
		{isRequired}
		bind:value
		{options}
		{errors}
		{label}
		{labelThumbnail}
		{t}
	/>
{/if}
