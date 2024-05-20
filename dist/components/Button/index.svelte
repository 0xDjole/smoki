<script>import SvgButton from './SvgButton.svelte';
export let kind = 'base';
export let size = 'small';
export let position = '';
export let onClick = null;
export let style = '';
export let disabled = false;
export let className = '';
const parseSize = (size) => {
    if (size === 'large') {
        return 'large';
    }
    if (size === 'full') {
        return 'full';
    }
    return 'small';
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
const svgKinds = ['delete', 'add', 'back', 'search', 'user', 'success', 'close'];
</script>

{#if svgKinds.includes(kind)}
	<SvgButton svgName={kind} {onClick} />
{:else}
	<button
		{disabled}
		class={`base ${parseSize(size)} ${parseKind(kind)} ${disabled ? 'disabled' : ''} ${className}`}
		{style}
		title={disabled ? 'Choose an item and date' : ''}
		on:click|preventDefault={(e) => {
			e.preventDefault();
			if (onClick) {
				onClick();
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

    color: var(--primary-text-color)
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

	.small {

    width: -moz-fit-content;

    width: fit-content
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

    background-color: transparent
}

	.disabled {

    opacity: 0.4
}</style>
