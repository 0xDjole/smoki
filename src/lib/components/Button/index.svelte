<script lang="ts">
	import SvgButton from './SvgButton.svelte';

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

<style type="text/postcss">
	.base {
		@apply bg-accent text-primary rounded-lg  font-semibold cursor-pointer hover:opacity-80 whitespace-nowrap m-0 h-full text-lg p-1;
	}

	.success {
		@apply bg-success;
	}

	.error {
		@apply bg-error;
	}

	.small {
		@apply w-fit;
	}

	.large {
		@apply w-full text-xl;
	}

	.full {
		@apply w-full rounded-none text-xl;
	}

	.boring {
		@apply bg-transparent;
	}

	.disabled {
		@apply opacity-40;
	}
</style>
