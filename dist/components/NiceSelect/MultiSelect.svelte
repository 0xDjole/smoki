<script>import Label from '../Label.svelte';
export let values = [];
export let options = [];
export let label = '';
export let disabled = false;
export let labelThumbnail = null;
export let errors = [];
export let position = 'vertical';
export let t;
export let isRequired = false;
const selectOption = (optionValue) => {
    if (!disabled) {
        const isSelected = values.includes(optionValue);
        if (isSelected) {
            values = values.filter((value) => value !== optionValue);
        }
        else {
            values = [...values, optionValue];
        }
    }
};
</script>

<div>
	<Label {isRequired} {t} {label} {labelThumbnail} {errors} />

	<div
		class="list"
		class:list-vertical={position === 'vertical'}
		class:list-horizontal={position === 'horizontal'}
	>
		{#each options as option}
			<div
				on:click|preventDefault={() => selectOption(option.value)}
				class:selected={values && values.some((value) => value.toString() === option.value)}
				class="option"
			>
				{option.label}
			</div>
		{/each}
	</div>
</div>

<style>
	.list {

    display: flex
}

	.list-horizontal {

    flex-direction: row;

    overflow: scroll
}

	.list-vertical {

    flex-direction: column
}

	.option {

    margin: 0.25rem;

    display: flex;

    min-width: 100px;

    cursor: pointer;

    align-items: center;

    justify-content: center;

    border-radius: 0.75rem;

    background-color: var(--secondary-background-color);

    padding: 0.125rem;

    font-size: 1rem;

    line-height: 1.5rem;

    font-weight: 700;

    color: var(--secondary-text-color);

    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);

    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

    transition-property: all;

    transition-duration: 200ms;

    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    border-color: var(--primary-border-color);

    border-width: 1px;

    border-style: solid
}

	@media (min-width: 768px) {

    .option {

        padding: 0.375rem;

        font-size: 1.125rem;

        line-height: 1.75rem
    }
}

	.selected {

    background-color: var(--accent-background-color);

    --tw-text-opacity: 1;

    color: rgb(255 255 255 / var(--tw-text-opacity))
}</style>
