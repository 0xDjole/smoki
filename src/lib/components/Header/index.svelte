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

<style type="text/postcss">
	.header-border {
		@apply border-underline;
	}

	.header-item {
		@apply flex justify-center items-center h-full;
	}

	.header {
		@apply top-0 bg-primary text-primary text-2xl font-bold flex gap-x-2 justify-start items-center w-full z-10;
		height: 60px;

		& .left,
		& .right {
			@apply flex-none;
			width: 20%;
			min-width: 50px;
		}

		& .middle {
			@apply flex-grow;
		}

		@screen md {
			height: 80px;
			@apply text-5xl;

			& .left,
			& .right {
				@apply flex-none;
				width: 20%;
			}
		}
	}

	.header-sticky {
		@apply sticky;
	}

	:global([slot='middle']) {
		align-items: center;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
