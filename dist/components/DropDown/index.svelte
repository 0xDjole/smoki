<script>import MultiDropDown from './MultiDropDown.svelte';
import SingleDropDown from './SingleDropDown.svelte';
export let value = null;
export let options = [];
export let label = '';
export let labelThumbnail = null;
export let errors = [];
export let isMultiSelect = false;
export let t;
export let isRequired = false;
export let onSelect = (value) => { };
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
