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
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		background-color: var(--primary-background-color);
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 700;
		color: var(--primary-text-color);
		border-color: var(--primary-border-color);
		border-width: 1px;
		border-style: solid;
		border-left: none;
		border-right: none;
		border-top: none;
		height: 60px;
		min-height: 60px;
		max-height: 60px;
		overflow: hidden;
		z-index: 100
}

	.left,
	.right {
		display: flex;
		flex: 1 1 0%
}

	.left {
		justify-content: flex-start;
		padding-left: 0.25rem
}

	.right {
		justify-content: flex-end;
		padding-right: 0.25rem
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
