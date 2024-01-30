<script lang="ts">
	import SvgIcon from '$lib/utils/components/SvgIcon.svelte';
	import Less from '$lib/utils/icons/less.svg?raw';
	import Modal from '$lib/utils/components/Modal/index.svelte';
	import Loader from '$lib/utils/components/Loader.svelte';

	import Header from '$lib/utils/components/Header/index.svelte';

	import { navigation } from 'super-navigation';

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	export let headerTitle = '';

	export let headerAction = null;
	export let headerActionName = 'Delete';
	export let confirmHeaderMessage = 'Are you sure you want to delete item?';

	export let bottomActionName;
	export let bottomAction;

	export let isLoading = false;

	let headerActionModalOpen = false;

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
	><div class="flex justify-center items-end h-full">
		<h2 class="text-primary font-bold text-2xl text-center">{confirmHeaderMessage}</h2>
	</div>
</Modal>

<Header>
	<div
		slot="left"
		class="nav-back"
		on:click={async () => {
			navigation.back();
		}}
	>
		<SvgIcon data={Less} color={'white'} size={'35px'} />
	</div>
	<span slot="middle" class="text-primary font-bold text-lg sm:text-3xl">{headerTitle}</span>
	<div class="flex flex-col sm:flex-row gap-2" slot="right">
		{#if headerAction}
			<button class="delete-btn" on:click={clickHeaderAction}>{headerActionName}</button>
		{/if}
	</div>
</Header>

{#if isLoading}
	<div class="absolute flex justify-center items-center h-full w-full z-50">
		<Loader />
	</div>
{/if}

<div class="layout">
	<div
		style={isLoading ? 'opacity: 50%;' : ''}
		class={`main-content h-[calc(100vh-55px-60px-50px)] md:h-[calc(100vh-55px-80px-50px)]`}
	>
		<div class="form"><slot /></div>
	</div>
	<button style={`height: 50px`} class="update-btn" on:click={clickBottomAction}
		>{bottomActionName}</button
	>
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

	.update-btn {
		@apply text-primary font-bold w-full text-2xl py-2 mx-auto bg-accent;
	}

	.delete-btn {
		@apply bg-error text-sm sm:text-xl px-1 sm:px-3 py-1  rounded-md;
		background: linear-gradient(to right, #ff4500, #ff0000);
	}
</style>
