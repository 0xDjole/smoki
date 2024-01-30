<script>import Input from '../Input/index.svelte';
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

	.label {

    margin-bottom: 0.5rem;

    font-size: 1.5rem;

    line-height: 2rem;

    font-weight: 700;

    color: var(--primary-text-color)
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

	.label-body {

    display: flex
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
