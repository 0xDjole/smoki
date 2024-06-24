<script>import Input from '../Input/index.svelte';
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

<style>
	.input {

    display: flex;

    align-items: center;

    -moz-column-gap: 0.5rem;

         column-gap: 0.5rem
}

	.add-options {

    font-size: 1.25rem;

    line-height: 1.75rem;

    font-weight: 700;

    color: var(--primary-text-color)
}

	.list {

    display: flex;

    -moz-column-gap: 0.75rem;

         column-gap: 0.75rem;

    font-size: 1.25rem;

    line-height: 1.75rem;

    font-weight: 700
}

	.item {

    display: flex;

    min-width: 100px;

    border-radius: 0.375rem;

    background-color: var(--secondary-background-color);

    padding-left: 0.75rem;

    padding-right: 0.75rem;

    padding-top: 0.25rem;

    padding-bottom: 0.25rem;

    text-align: center;

    font-weight: 700;

    border-color: var(--primary-border-color);

    border-width: 1px;

    border-style: solid
}

	.custom-field-body {

    display: flex;

    flex-direction: column;

    row-gap: 0.5rem;

    border-radius: 0.375rem;

    padding: 0.5rem;

    border-color: var(--primary-border-color);

    border-width: 1px;

    border-style: solid
}

	.add-field-body {

    height: 600px;

    overflow-y: scroll;

    padding: 0.75rem
}

	.field-item {

    display: flex;

    justify-content: space-between;

    font-weight: 700;

    color: var(--primary-text-color)
}

	.fields {

    display: flex;

    gap: 0.5rem;

    font-weight: 700;

    color: var(--primary-text-color)
}</style>
