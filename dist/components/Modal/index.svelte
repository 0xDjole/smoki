<script>import Button from '../Button/index.svelte';
export let title = '';
export let showModal;
export let height = 'calc(100vh - 30%)';
export let top = '10%';
export let zIndex = 1;
export let confirmText = null;
export let modalStyle = '';
export let confirm = () => { };
export let disabled = false;
export let onCancel;
</script>

{#if showModal}
	<div class="wrapper" style={`z-index: ${zIndex};`}>
		<div class="modal" style={`height: ${height}; top: ${top}; ${modalStyle}`}>
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

<style>
	.wrapper {
		position: fixed;
		top: 0px;
		left: 0px;
		z-index: 40;
		height: 100%;
		width: 100%;
		justify-content: center;
		background-color: rgb(0 0 0 / var(--tw-bg-opacity));
		--tw-bg-opacity: 0.8
}
	.content {
		display: flex;
		width: 100%;
		flex-grow: 1;
		flex-direction: column;
		overflow-y: scroll
}
	.modal {
		position: relative;
		inset: 0px;
		z-index: 40;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		flex-direction: column;
		border-radius: 0.375rem;
		background-color: var(--primary-background-color);
		color: var(--primary-text-color);
		border-color: var(--primary-border-color);
		border-width: 1px;
		border-style: solid
}
	.options {
		margin-left: 1.25rem;
		margin-right: 1.25rem;
		padding-bottom: 1.25rem
}
	.header-title {
		margin-left: auto;
		margin-right: auto;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-top: 0.5rem;
		text-align: center;
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 700;
		max-width: calc(100% - 50px)
}
	.top-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem
}
	.close-button {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		cursor: pointer
}
	@media (min-width: 768px) {
		.close-button {
				top: 1.25rem;
				right: 1.25rem
		}
}</style>
