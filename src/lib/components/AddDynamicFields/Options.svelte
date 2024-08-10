<script lang="ts">
	import Input from '../Input/index.svelte';
	import DropDown from '../DropDown/index.svelte';
	import Label from '../Label.svelte';
	import Close from '../../utils/icons/close.svg?raw';
	import SvgIcon from '../SvgIcon.svelte';

	export let label = '';
	export let options = [];
	export let errors = [];
	export let type = 'text';
	export let t;

	let value;
	let condition;

	$: inputType = type === 'select' ? 'text' : type;
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

	const removeOption = (index) => {
		options = options.filter((_, i) => i !== index);
	};
</script>

<Label {t} {label} {errors} />

<div class="input">
	<Input {t} bind:value type={inputType} kind="primary" placeholder="Please enter value" />

	<DropDown {t} options={operations} bind:value={condition} />

	<button on:click|preventDefault={add} class="add-options">Add options</button>
</div>

<div class="list">
	{#each options as option, index}
		<div class="item">
			<span>{option}</span>

			<div on:click|preventDefault={() => removeOption(index)}>
				<SvgIcon data={Close} size={'30px'} color={'white'} />
			</div>
		</div>
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
		@apply flex border-primary font-bold px-3 py-1 bg-secondary rounded-md min-w-[100px] text-center;
	}

	.custom-field-body {
		@apply flex flex-col   border-primary rounded-md p-2 gap-y-2;
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
