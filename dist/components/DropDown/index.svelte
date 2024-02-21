<script>import MultiDropDown from './MultiDropDown.svelte';
import SingleDropDown from './SingleDropDown.svelte';
export let value = null;
export let options = [];
export let label = '';
export let labelThumbnail = null;
export let errors = [];
export let isMultiSelect = false;
</script>

{#if isMultiSelect}
	<MultiDropDown bind:values={value} {options} {errors} {label} {labelThumbnail} />
{:else}
	<SingleDropDown bind:value {options} {errors} {label} {labelThumbnail} />
{/if}
