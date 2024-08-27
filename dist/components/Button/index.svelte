<script>import SvgButton from './SvgButton.svelte';
export let kind = 'base';
export let size = 'normal';
export let position = '';
export let onClick = null;
export let style = '';
export let disabled = false;
export let className = '';
export let stopPropagation = true;
const parseSize = (size) => {
    if (size === 'large') {
        return 'large';
    }
    if (size === 'full') {
        return 'full';
    }
    if (size === 'small') {
        return 'small';
    }
    return 'normal';
};
const parseKind = (kind) => {
    if (kind === 'success') {
        return 'success';
    }
    if (kind === 'error') {
        return 'error';
    }
    if (kind === 'boring') {
        return 'boring';
    }
    return '';
};
const svgKinds = ['delete', 'add', 'back', 'search', 'user', 'success', 'close', 'preview'];
</script>

{#if svgKinds.includes(kind)}
	<SvgButton {stopPropagation} {size} svgName={kind} {onClick} />
{:else}
	<button
		{disabled}
		class={`base ${parseSize(size)} ${parseKind(kind)} ${disabled ? 'disabled' : ''} ${className}`}
		{style}
		title={disabled ? 'Choose an item and date' : ''}
		on:click={(e) => {
			e.preventDefault();

			if (stopPropagation) {
				e.stopPropagation();
			}

			if (onClick) {
				onClick(e);
			}
		}}><slot /></button
	>
{/if}

<style>
	.base {

    margin: 0px;

    height: 100%;

    cursor: pointer;

    white-space: nowrap;

    border-radius: 0.5rem;

    background-color: var(--accent-background-color);

    padding: 0.25rem;

    font-size: 1.125rem;

    line-height: 1.75rem;

    font-weight: 600;

    --tw-text-opacity: 1;

    color: rgb(255 255 255 / var(--tw-text-opacity))
}

.base:hover {

    opacity: 0.8
}

	.success {

    background-color: var(--success-background-color)
}

	.error {

    background-color: var(--error-background-color)
}

	.normal {

    width: -moz-fit-content;

    width: fit-content;

    font-size: 1rem;

    line-height: 1.5rem
}

	.small {

    width: -moz-fit-content;

    width: fit-content;

    font-size: 0.875rem;

    line-height: 1.25rem
}

	.large {

    width: 100%;

    font-size: 1.25rem;

    line-height: 1.75rem
}

	.full {

    width: 100%;

    border-radius: 0px;

    font-size: 1.25rem;

    line-height: 1.75rem
}

	.boring {

    margin: 0px;

    background-color: transparent;

    padding: 0px;

    color: var(--primary-text-color)
}

	.disabled {

    opacity: 0.4
}</style>
