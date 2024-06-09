<script>import Input from '../Input/index.svelte';
import Label from '../Label.svelte';
export let label = '';
export let errors = [];
export let range = { min: '', max: '' };
export let t;
$: if (!range) {
    range = { min: '', max: '' };
}
</script>

<Label {t} {label} {errors} />

<div class="range">
	<Input {t} bind:value={range.min} type="text" kind="primary" placeholder="Min" />
	<Input {t} bind:value={range.max} type="text" kind="primary" placeholder="Max" />
</div>

<style>
	.range {
    display: flex;
    -moz-column-gap: 0.5rem;
         column-gap: 0.5rem
}
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
