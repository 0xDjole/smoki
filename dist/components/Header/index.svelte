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
		justify-content: center;
		overflow: hidden
}

	.header {
		top: 0px;
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: flex-start;
		-moz-column-gap: 0.5rem;
		     column-gap: 0.5rem;
		background-color: var(--primary-background-color);
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 700;
		color: var(--primary-text-color);
		height: 60px
}

	.header .left,
		.header .right {
		flex: none;
			width: 20%;
			min-width: 50px
}

	.header .middle {
		flex-grow: 1
}

	@media (min-width: 768px) {

	.header {
			height: 80px;
			font-size: 3rem;
			line-height: 1
	}

			.header .left,
			.header .right {
				flex: none;
				width: 20%
		}
		}

	.header-sticky {
		position: sticky
}

	:global([slot='middle']) {
		align-items: center;
		text-overflow: ellipsis;
		white-space: nowrap;
	}</style>
