<script lang="ts">
	import MultiSelect from './MultiSelect.svelte';
	import SingleSelect from './SingleSelect.svelte';

	export let value = null;
	export let options = [];
	export let label = '';
	export let errors = [];
	export let position = 'vertical';
	export let ui = 'default';
	export let isMultiSelect = false;
</script>

{#if isMultiSelect}
	<MultiSelect bind:values={value} {options} {position} {errors} {label} />
{:else}
	<SingleSelect bind:values={value} {options} {position} {errors} {label} />
{/if}
