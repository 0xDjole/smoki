<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Close from '../../utils/icons/close.svg?raw';
	import SvgIcon from '../SvgIcon.svelte';
	import Button from '../Button/index.svelte';

	type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

	interface Props {
		title?: string;
		showModal: any;
		zIndex?: number;
		confirmText?: string | null;
		class?: string;
		size?: ModalSize;
		confirm?: () => void;
		disabled?: boolean;
		onCancel: () => void;
		children?: import('svelte').Snippet;
	}

	let {
		title = '',
		showModal = $bindable(),
		zIndex = 200,
		confirmText = null,
		class: className = '',
		size = 'md',
		confirm = () => {},
		disabled = false,
		onCancel,
		children
	}: Props = $props();

	// Define widths for each size
	const sizeWidths = {
		sm: '32rem', // Small size
		md: '48rem', // Medium size
		lg: '64rem', // Large size
		xl: '80rem', // Extra large size
		full: '95vw' // Full-screen size
	};

	// Get the width based on the size prop
	const modalWidth = sizeWidths[size];
</script>

{#if showModal}
	<div
		class="wrapper"
		style={`z-index: ${zIndex};`}
		transition:fade={{ duration: 100 }}
		on:click={(e) => {
			if (e.target === e.currentTarget) onCancel();
		}}
		on:keydown={(e) => {
			if (e.key === 'Escape') onCancel();
		}}
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? 'modal-title' : undefined}
	>
		<div
			class="modal"
			style={`
        width: 100%;
        max-width: ${modalWidth};
        min-height: ${size === 'full' ? '90vh' : '400px'};
      `}
			transition:fly={{ y: 20, duration: 200 }}
		>
			<div class="close-button">
				<Button kind="close" onClick={() => onCancel()} aria-label="Close modal" />
			</div>
			{#if title}
				<div class="top-bar">
					<h2 id="modal-title" class="header-title">{title}</h2>
				</div>
			{/if}
			<div class="content">
				{@render children?.()}
			</div>
			{#if confirmText}
				<div class="options">
					<Button {disabled} size="large" onClick={() => confirm()}>
						{confirmText}
					</Button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style type="text/postcss">
	.wrapper {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
		overflow-y: auto;
		padding: 1rem;
	}
	.modal {
		display: flex;
		flex-direction: column;
		position: relative;
		border-radius: 0.75rem;
		background-color: var(--primary-background-color);
		color: var(--primary-text-color);
		border: 1px solid var(--primary-border-color);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transform: translateY(0);
		transition: transform 0.1s ease;
	}
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		flex-grow: 1;
		overflow-y: auto;
		padding: 1rem;
	}
	.options {
		padding: 1rem;
		border-top: 1px solid var(--primary-border-color);
		background-color: var(--primary-background-color);
		border-bottom-left-radius: 0.75rem;
		border-bottom-right-radius: 0.75rem;
	}
	.header-title {
		width: 100%;
		font-size: 1.25rem;
		font-weight: bold;
		text-align: center;
		padding: 0.75rem 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.close-button {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		cursor: pointer;
		transition: transform 0.1s ease;
	}
	.close-button:hover {
		transform: scale(1.05);
	}
	.close-button:active {
		transform: scale(0.95);
	}

	/* Responsive adjustments */
	@media (max-width: 640px) {
		.modal {
			width: 100% !important;
			max-width: none !important;
			min-height: auto;
		}
	}
</style>
