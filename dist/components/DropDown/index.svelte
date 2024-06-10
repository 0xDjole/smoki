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
</script>

{#if isMultiSelect}
	<MultiDropDown {isRequired} bind:values={value} {options} {errors} {label} {labelThumbnail} {t} />
{:else}
	<SingleDropDown {isRequired} bind:value {options} {errors} {label} {labelThumbnail} {t} />
{/if}
