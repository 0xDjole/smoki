<script lang="ts">
	import Label from '../Label.svelte';

	export let value: string | number | boolean;
	export let defaultOption;
	export let options = [];
	export let label = '';
	export let labelThumbnail = null;

	export let errors = [];
</script>

<div>
	<Label {errors} {label} {labelThumbnail} />

	<select class="select" bind:value>
		{#if defaultOption}
			<option>{defaultOption}</option>
		{/if}

		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</div>

<style type="text/postcss">
	.select {
		@apply w-full p-2 bg-secondary text-white rounded-lg border-2 border-secondary border-solid font-semibold text-2xl outline-none
            text-opacity-80;
	}
</style>
