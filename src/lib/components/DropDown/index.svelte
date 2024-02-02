<script lang="ts">
	import MultiDropDown from './MultiDropDown.svelte';
	import SingleDropDown from './SingleDropDown.svelte';

	export let value = null;
	export let options = [];
	export let label = '';
	export let errors = [];
	export let isMultiSelect = false;
</script>

{#if isMultiSelect}
	<MultiDropDown bind:values={value} {options} {errors} {label} />
{:else}
	<SingleDropDown bind:value {options} {errors} {label} />
{/if}
