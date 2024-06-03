<script lang="ts">
	import Input from '../Input/index.svelte';
	import Label from '../Label.svelte';

	export let label = '';
	export let errors = [];

	export let range = { min: '', max: '' };
</script>

<Label {label} {errors} />

<div class="range">
	<Input bind:value={range.min} type="number" kind="primary" placeholder="Min" />
	<Input bind:value={range.max} type="number" kind="primary" placeholder="Max" />
</div>

<style type="text/postcss">
	.range {
		@apply flex gap-x-2;
	}
	.input {
		@apply flex items-center gap-x-2;
	}
	.add-options {
		@apply text-primary font-bold text-xl;
	}
	.list {
		@apply flex font-bold text-xl gap-x-3;
	}
	.item {
		@apply border-primary font-bold px-3 py-1 bg-secondary rounded-md min-w-[100px] text-center;
	}
	.custom-field-body {
		@apply flex flex-col border-secondary rounded-md p-2 gap-y-2;
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
</style>
