<script>export let kind = '';
export let onClick;
export let end = false;
export let size = '';
export let style = '';
export let disabled = false;
export let className = '';
</script>

<button
	class={`base ${kind === 'submit' ? 'submit' : ''} ${size === 'small' ? 'small' : ''} ${
		end ? 'end' : ''
	} ${disabled ? 'disabled' : ''} ${className}`}
	{style}
	title={disabled ? 'Choose an item and date' : ''}
	on:click={(e) => {
		e.preventDefault();
		onClick();
	}}><slot /></button
>

<style>
	.base {

    width: 100%;

    cursor: pointer;

    white-space: nowrap;

    border-radius: 0.5rem;

    background-color: var(--accent-background-color);

    padding: 0.5rem;

    font-size: 1.5rem;

    line-height: 2rem;

    font-weight: 600;

    color: var(--primary-text-color);

    border-color: var(--primary-border-color);

    border-width: 1px;

    border-style: solid
}

.base:hover {

    background-color: var(--secondary-background-color);

    color: var(--success-background-color)
}

	.submit {

    margin-top: 1.25rem;

    padding: 1rem;

    font-size: 1.875rem;

    line-height: 2.25rem
}

	.small {

    margin: 0px;

    height: 100%;

    width: -moz-fit-content;

    width: fit-content;

    padding: 0.25rem;

    font-size: 1.125rem;

    line-height: 1.75rem
}

	.end {

    align-self: flex-end
}

	.disabled {

    opacity: 0.5
}</style>
