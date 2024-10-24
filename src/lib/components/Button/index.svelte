<script lang="ts">
	import SvgButton from './SvgButton.svelte';

	interface Props {
		kind?: string;
		size?: string;
		position?: string;
		onClick?: any;
		style?: string;
		disabled?: boolean;
		className?: string;
		stopPropagation?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		kind = 'base',
		size = 'normal',
		position = '',
		onClick = () => {},
		style = '',
		disabled = false,
		className = '',
		stopPropagation = true,
		children
	}: Props = $props();

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


	// <SvgButton {stopPropagation} {size} svgName={kind} {onClick} /> 
</script>

{#if svgKinds.includes(kind)}
    <div>SVG</div>
{:else}
	<button
		{disabled}
		class={`base ${parseSize(size)} ${parseKind(kind)} ${disabled ? 'disabled' : ''} ${className}`}
		{style}
		title={disabled ? 'Choose an item and date' : ''}
		onclick={(e) => {
			e.preventDefault();

			if (stopPropagation) {
				e.stopPropagation();
			}

			if (onClick) {
				onClick(e);
			}
		}}>{@render children?.()}</button
	>
{/if}

<style type="text/postcss">
	.base {
		@apply bg-accent text-white rounded-lg  font-semibold cursor-pointer hover:opacity-80 whitespace-nowrap m-0 h-full text-lg p-1;
	}

	.success {
		@apply bg-success;
	}

	.error {
		@apply bg-error;
	}

	.normal {
		@apply w-fit text-base;
	}

	.small {
		@apply w-fit text-sm;
	}

	.large {
		@apply w-full text-xl;
	}

	.full {
		@apply w-full rounded-none text-xl;
	}

	.boring {
		@apply bg-transparent p-0 m-0 text-primary;
	}

	.disabled {
		@apply opacity-40;
	}
</style>
