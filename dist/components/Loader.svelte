<script>export let show = true;
</script>

{#if show}
	<div class="lds-dual-ring" />
{/if}

<style>
	.lds-dual-ring {
		display: block;
		width: 35px;
		height: 35px;
		margin-left: auto;
		margin-right: auto;
		border: 6px solid var(--accent-color);
		border-radius: 50%;
		border-color: var(--accent-color) transparent;
		animation: lds-dual-ring 1.2s linear infinite;
		will-change: transform;
	}

	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}</style>
