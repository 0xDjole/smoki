<script>import DropDownIcon from '../../utils/icons/dropdown.svg?raw';
import { _ } from 'svelte-i18n';
import SvgIcon from '../SvgIcon.svelte';
export let value;
export let defaultOption;
export let options = [];
export let label = '';
export let labelThumbnail = null;
export let errors = [];
let showModal = false;
const selectOption = (optionValue) => {
    showModal = false;
};
$: selectedOption = options.find((option) => option.value === value);
$: console.log('show ', showModal);
</script>

<div class="select">
	<div class="select-button" on:click={() => (showModal = !showModal)}>
		<span>{selectedOption?.label || $_('choose')}</span>

		<SvgIcon data={DropDownIcon} width={'25px'} size={'25px'} color={'white'} />
	</div>
	{#if showModal === true}
		<div class="options">
			{#each options as option}
				<div
					class="item"
					class:selected={option.value === value}
					on:click={() => {
						showModal = false;
						value = option.value;
					}}
				>
					{option.label}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.select {

    position: relative
}

	.select-button {

    display: flex;

    width: 100%;

    min-width: 80px;

    cursor: pointer;

    justify-content: space-between;

    -moz-column-gap: 0.5rem;

         column-gap: 0.5rem;

    border-radius: 0.5rem;

    background-color: var(--accent-background-color);

    padding: 0.25rem;

    font-size: 1.125rem;

    line-height: 1.75rem;

    font-weight: 600;

    --tw-text-opacity: 1;

    color: rgb(255 255 255 / var(--tw-text-opacity));

    outline: 2px solid transparent;

    outline-offset: 2px;

    border-color: var(--primary-border-color);

    border-width: 1px;

    border-style: solid
}

	.options {

    position: absolute;

    top: 2.5rem;

    left: 0px;

    display: flex;

    width: 100%;

    flex-direction: column;

    border-radius: 0.375rem;

    background-color: var(--secondary-background-color)
}

	.item {

    width: 100%;

    cursor: pointer;

    padding: 0.25rem
}

	.selected {

    border-radius: 0.375rem;

    background-color: var(--accent-background-color);

    padding: 0.25rem
}</style>
