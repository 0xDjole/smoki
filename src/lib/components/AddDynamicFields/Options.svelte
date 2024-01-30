<script lang="ts">
	import Input from '../Input/index.svelte';
	import DropDown from '../DropDown/index.svelte';

	export let label = '';
	export let options = [];
	export let errors = [];

	let value;
	let condition;

	const operations = [
		{ label: 'Smaller than', value: '<' },
		{ label: 'Greater than', value: '>' },
		{ label: 'Equals', value: '=' }
	];

	const add = () => {
		let option = `${condition}${value}`;
		options = [...options, option];
		value = '';
		condition = '=';
	};
</script>

{#if label}
	<label class:label-error={errors.length} for={label} class="label">{label}</label>
{/if}

<div class="input">
	<Input bind:value type="text" kind="primary" placeholder="Please enter value" />

	<DropDown options={operations} bind:value={condition} />

	<button on:click={add} class="add-options">Add options</button>
</div>

<div class="list">
	{#each options as option}
		<div class="item">{option}</div>
	{/each}
</div>

<style type="text/postcss">
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

	.label {
		@apply text-primary text-2xl mb-2 font-bold;
	}

	.custom-field-body {
		@apply flex flex-col   border-secondary rounded-md p-2 gap-y-2;
	}

	.label-body {
		@apply flex;
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
