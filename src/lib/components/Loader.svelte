<script lang="ts">
	export let show = true;
</script>

{#if show}
	<div class="loader-container">
		<div class="lds-dual-ring" />
	</div>
{/if}

<style type="text/postcss">
	.loader-container {
		@apply grid justify-self-center justify-center content-center;
		width: 35px;
		height: 35px;
	}

	.lds-dual-ring {
		display: inline-block;
	}
	.lds-dual-ring:after {
		@apply border-[6px] border-solid;
		content: ' ';
		display: block;
		width: 34px;
		height: 34px;
		margin: 8px;
		border-radius: 50%;
		border-color: var(--accent-color) transparent var(--accent-color) transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}
	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
