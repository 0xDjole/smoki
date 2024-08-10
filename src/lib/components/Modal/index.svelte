<script>
	import Close from '../../utils/icons/close.svg?raw';
	import SvgIcon from '../SvgIcon.svelte';
	import Button from '../Button/index.svelte';

	export let title = '';
	export let showModal;
	export let height = 'calc(100vh - 30%)';
	export let top = '10%';
	export let zIndex = 1;
	export let confirmText = null;
	export let modalStyle = '';

	export let confirm = () => {};
	export let disabled = false;
	export let onCancel;
</script>

{#if showModal}
	<div class="wrapper" style={`z-index: ${zIndex};`}>
		<div class="modal" style={`height: ${height}; top: ${top}; ${modalStyle}`}>
			<div class="top-bar">
				{#if title}
					<div class="header-title">{title}</div>
				{/if}
				<div class="close" on:click|preventDefault={() => onCancel()}>
					<SvgIcon data={Close} width={'40px'} size={'40px'} color={'red'} />
				</div>
			</div>

			<div class="content">
				<slot />
			</div>
			{#if confirmText}
				<div class="options">
					<Button {disabled} size={'large'} onClick={() => confirm()}>{confirmText}</Button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style type="text/postcss">
	.wrapper {
		@apply justify-center bg-[#000] bg-opacity-80 fixed top-0 left-0 w-full h-full z-40;
	}
	.content {
		@apply flex flex-col w-full flex-grow overflow-y-scroll;
	}

	.modal {
		@apply flex flex-col relative rounded-md inset-0 z-40 bg-primary text-primary border-2 border-primary border-solid mx-auto;
	}

	.options {
		@apply mx-5 pb-5;
	}
	.header-title {
		@apply w-full text-3xl font-bold text-center pt-2;
	}

	.header-title {
		@apply w-full text-3xl font-bold text-center pt-2 truncate mx-auto;
		max-width: calc(100% - 50px);
	}

	.close {
		@apply absolute top-0 right-0 mt-4 mr-4 cursor-pointer;
	}

	.top-bar {
		@apply flex justify-between items-center px-4 py-2;
	}
</style>
