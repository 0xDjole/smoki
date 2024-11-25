<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Close from '../../utils/icons/close.svg?raw';
	import SvgIcon from '../SvgIcon.svelte';
	import Button from '../Button/index.svelte';

	interface Props {
		title?: string;
		showModal: any;
		height?: string;
		top?: string;
		zIndex?: number;
		confirmText?: any;
		modalStyle?: string;
		confirm?: any;
		disabled?: boolean;
		onCancel: any;
		children?: import('svelte').Snippet;
	}

	let {
		title = '',
		showModal = $bindable(),
		height = 'calc(100vh - 30%)',
		top = '0%',
		zIndex = 200,
		confirmText = null,
		modalStyle = '',
		confirm = () => {},
		disabled = false,
		onCancel,
		children
	}: Props = $props();
</script>

{#if showModal}
	<div
		class="wrapper"
		style={`z-index: ${zIndex};`}
		transition:fade={{ duration: 100 }}
		on:click={(e) => {
			if (e.target === e.currentTarget) onCancel();
		}}
	>
		<div
			class="modal"
			style={`height: ${height}; top: ${top}; ${modalStyle}`}
			transition:fly={{ y: 20, duration: 200 }}
		>
			<div class="close-button">
				<Button
					kind="close"
					onClick={() => {
						onCancel();
					}}
				/>
			</div>

			{#if title}
				<div class="top-bar">
					<div class="header-title">{title}</div>
				</div>
			{/if}

			<div class="content">
				{@render children?.()}
			</div>

			{#if confirmText}
				<div class="options">
					<Button {disabled} size={'large'} onClick={() => confirm()}>
						{confirmText}
					</Button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style type="text/postcss">
	.wrapper {
		@apply justify-center bg-black/60 backdrop-blur-sm fixed top-0 left-0 w-full h-full
               flex items-center;
	}

	.modal {
		@apply flex flex-col relative rounded-xl inset-0 z-40 bg-primary text-primary 
               border border-primary mx-auto shadow-xl max-w-[900px] w-[90%]
               transform transition-transform duration-100;
	}

	.content {
		@apply flex flex-col w-full flex-grow overflow-y-auto px-6 py-4;
	}

	.options {
		@apply px-6 py-4 border-t border-primary
               bg-primary rounded-b-xl;
	}

	.header-title {
		@apply w-full text-2xl font-bold text-center py-4 truncate mx-auto;
		max-width: calc(100% - 50px);
	}

	.top-bar {
		@apply flex justify-between items-center;
	}

	.close-button {
		@apply absolute top-3 right-3 md:top-4 md:right-4 cursor-pointer
               transition-transform hover:scale-105 active:scale-95;
	}

	/* Media queries for responsive sizing */
	@media (min-width: 768px) {
		.modal {
			@apply w-[80%];
		}
	}
</style>
