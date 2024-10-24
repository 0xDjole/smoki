<script lang="ts">
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

<style type="text/postcss">
	.header-border {
		@apply border-underline;
	}

	.header-item {
		@apply flex justify-center items-center h-full;
	}

	.header {
		@apply top-0 bg-primary text-primary text-2xl font-bold flex justify-between items-center w-full border-primary;
		border-left: none;
		border-right: none;
		border-top: none;
		height: 60px;
		min-height: 60px;
		max-height: 60px;
		overflow: hidden;
		z-index: 100;
	}

	.left,
	.right {
		@apply flex flex-1;
	}

	.left {
		@apply justify-start pl-1;
	}

	.right {
		@apply justify-end pr-1;
	}

	.header-sticky {
		@apply sticky;
	}

	:global([slot='middle']) {
		@apply overflow-hidden; /* Prevents overflow from altering flex distribution */
		align-items: center;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
