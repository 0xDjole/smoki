<script lang="ts">
	interface Props {
		show?: boolean;
	}

	let { show = true }: Props = $props();
</script>

{#if show}
	<div class="simple-spinner"></div>
{/if}

<style>
	.simple-spinner {
		display: block;
		width: 35px;
		height: 35px;
		margin-left: auto;
		margin-right: auto;
		border: 5px solid var(--accent-color);
		border-top: 5px solid transparent;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
