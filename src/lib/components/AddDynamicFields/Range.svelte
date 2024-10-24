<script lang="ts">
	import { run } from 'svelte/legacy';

	import Input from '../Input/index.svelte';
	import Label from '../Label.svelte';



	interface Props {
		label?: string;
		errors?: any;
		range?: any;
		t: any;
	}

	let {
		label = '',
		errors = [],
		range = $bindable({ min: '', max: '' }),
		t
	}: Props = $props();

	run(() => {
		if (!range) {
			range = { min: '', max: '' };
		}
	});
</script>

<Label {t} {label} {errors} />

<div class="range">
	<Input {t} bind:value={range.min} type="text" kind="primary" placeholder="Min" />
	<Input {t} bind:value={range.max} type="text" kind="primary" placeholder="Max" />
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
		@apply flex flex-col border-primary rounded-md p-2 gap-y-2;
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
