<script>
	export let showBorder = true;
	export let sticky = true;
</script>

<div class:header-sticky={sticky} class:header-border={showBorder} class="header">
	<div class="header-item left">
		<slot name="left" />
	</div>
	<div class="header-item middle">
		<slot name="middle" />
	</div>
	<div class="header-item right">
		<slot name="right" />
	</div>
</div>

<style>
	.header-border {
		border-bottom-color: var(--primary-border-color);
		border-bottom-width: 1px;
		border-bottom-style: solid
}

	.header-item {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center
}

	.header {
		top: 0px;
		z-index: 10;
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		background-color: var(--primary-background-color);
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 700;
		color: var(--primary-text-color);
		height: 60px
}

	.left,
	.right {
		display: flex;
		flex: 1 1 0%;
		overflow: hidden
}

	.left {
		justify-content: flex-start
}

	.right {
		justify-content: flex-end
}

	.header-sticky {
		position: sticky
}

	:global([slot='middle']) {
		overflow: hidden; /* Prevents overflow from altering flex distribution */
		align-items: center;
		text-overflow: ellipsis;
		white-space: nowrap
}</style>
