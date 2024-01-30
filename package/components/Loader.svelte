<script>export let show = true;
</script>

{#if show}
	<div class="loader-container">
		<div class="lds-dual-ring" />
	</div>
{/if}

<style>
	.loader-container {
		display: grid;
		align-content: center;
		justify-content: center;
		justify-self: center;
		width: 35px;
		height: 35px;
}

	.lds-dual-ring {
		display: inline-block;
	}

	.lds-dual-ring:after {
		content: ' ';
		display: block;
		width: 34px;
		height: 34px;
		margin: 8px;
		border-radius: 50%;
		border: 6px solid orange;
		border-color: orange transparent orange transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}

	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}</style>
