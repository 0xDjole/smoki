<script lang="ts">
	import Button from '../Button/index.svelte';
	import Modal from '../Modal/index.svelte';
	import Loader from '../Loader.svelte';
	import Header from '../Header/index.svelte';




	interface Props {
		headerTitle?: string;
		headerAction?: any;
		headerActionName?: string;
		confirmHeaderMessage?: string;
		bottomActionName: any;
		bottomAction: any;
		goBack?: any;
		isLoading?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		headerTitle = '',
		headerAction = null,
		headerActionName = 'Delete',
		confirmHeaderMessage = 'Are you sure you want to delete item?',
		bottomActionName,
		bottomAction,
		goBack = () => {},
		isLoading = $bindable(false),
		children
	}: Props = $props();

	let headerActionModalOpen = $state(false);

	const clickHeaderAction = () => {
		headerActionModalOpen = true;
	};

	const clickBottomAction = async () => {
		try {
			isLoading = true;
			await bottomAction();
		} finally {
			isLoading = false;
		}
	};

	const confirmHeader = async () => {
		try {
			isLoading = true;
			await headerAction();
		} finally {
			isLoading = false;
			headerActionModalOpen = false;
		}
	};
</script>

<Modal
	title="Please confirm!"
	height="300px"
	showModal={headerActionModalOpen}
	onCancel={() => {
		headerActionModalOpen = false;
	}}
	confirm={confirmHeader}
	confirmText={confirmHeaderMessage}
	><div></div>
</Modal>

<Header>
	{#snippet left()}
		<Button
			
			kind="back"
			onClick={() => {
				goBack();
			}}
		/>
	{/snippet}
	{#snippet middle()}
		<span  class="title">{headerTitle}</span>
	{/snippet}
	{#snippet right()}
		<div class="right-header" >
			{#if headerAction}
				<Button size="small" kind="error" onClick={clickHeaderAction}>{headerActionName}</Button>
			{/if}
		</div>
	{/snippet}
</Header>

{#if isLoading}
	<div class="loader">
		<Loader />
	</div>
{/if}

<div class="layout">
	<div style={isLoading ? 'opacity: 50%;' : ''} class={`form-wrap`}>
		<div class="form">{@render children?.()}</div>
	</div>
	<Button size="full" style={`height: 50px`} onClick={clickBottomAction}>{bottomActionName}</Button>
</div>

<style type="text/postcss">
	.layout {
		@apply flex flex-col justify-center bg-primary overflow-hidden;
		font-family: Arial, sans-serif;
	}

	.form {
		@apply flex flex-col w-full p-5 gap-y-5;
		@screen md {
			@apply w-3/4;
		}
	}

	.main-content {
		@apply flex overflow-y-scroll justify-center;
	}

	.form-wrap {
		@apply main-content h-full;
	}

	.loader {
		@apply absolute flex justify-center items-center h-full w-full z-50;
	}

	.title {
		@apply text-primary font-bold text-lg sm:text-3xl;
	}

	.right-header {
		@apply flex-col sm:flex-row gap-2;
	}
</style>
