<script>import MultiSelect from './MultiSelect.svelte';
import SingleSelect from './SingleSelect.svelte';
export let value = null;
export let disabled = false;
export let options = [];
export let label = '';
export let labelThumbnail = null;
export let errors = [];
export let position = 'vertical';
export let ui = 'default';
export let isMultiSelect = false;
export let t;
export let isRequired = false;
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
