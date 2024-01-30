<script>
	export let sticky = true;
	export let headerClass;
</script>

<div class:header-sticky={sticky} class={`header ${headerClass}`}>
	<div class="header-item">
		<slot class="header-item left" name="left" />
	</div>
	<div class="header-item">
		<slot class="header-item middle" name="middle" />
	</div>
	<div class="header-item">
		<slot class="header-item right" name="right" />
	</div>
</div>

<style>
	.header-item {
		display: grid;
		justify-content: center
}

	.header {
		top: 0px;
		display: grid;
		width: 100%;
		grid-auto-flow: column;
		align-items: center;
		justify-content: flex-start;
		-moz-column-gap: 0.5rem;
		     column-gap: 0.5rem;
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 700;
		--tw-text-opacity: 1;
		color: rgb(255 255 255 / var(--tw-text-opacity));
		grid-template-columns: 1fr 5fr 1fr;
		height: 60px
}

	@media (min-width: 768px) {

	.header {
			height: 80px;
			font-size: 3rem;
			line-height: 1
	}
		}

	.header-sticky {
		position: sticky
}</style>
