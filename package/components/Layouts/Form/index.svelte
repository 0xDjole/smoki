<script>import SvgIcon from '../../../utils/components/SvgIcon.svelte';
import Less from '../../../utils/icons/less.svg?raw';
import Modal from '../../../utils/components/Modal/index.svelte';
import Loader from '../../../utils/components/Loader.svelte';
import Header from '../../../utils/components/Header/index.svelte';
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
    }
    finally {
        isLoading = false;
    }
};
const confirmHeader = async () => {
    try {
        isLoading = true;
        await headerAction();
    }
    finally {
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

<style>
	.layout {
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		background-color: var(--primary-background-color);
		font-family: Arial, sans-serif;
}

	.form {
		display: flex;
		width: 100%;
		flex-direction: column;
		row-gap: 1.25rem;
		padding: 1.25rem;
}

	@media (min-width: 768px) {

	.form {
				width: 75%;
		}
		}

	.main-content {
		display: flex;
		justify-content: center;
		overflow-y: scroll;
}

	.update-btn {
		margin-left: auto;
		margin-right: auto;
		width: 100%;
		background-color: var(--accent-background-color);
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 700;
		color: var(--primary-text-color);
}

	.delete-btn {
		border-radius: 0.375rem;
		background-color: var(--error-background-color);
		padding-left: 0.25rem;
		padding-right: 0.25rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
}

	@media (min-width: 640px) {

		.delete-btn {
				padding-left: 0.75rem;
				padding-right: 0.75rem;
				font-size: 1.25rem;
				line-height: 1.75rem;
		}
}

	.delete-btn {
		background: linear-gradient(to right, #ff4500, #ff0000);
	}</style>
