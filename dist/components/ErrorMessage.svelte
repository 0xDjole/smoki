<script>import { fly, fade } from 'svelte/transition';
export let errors = [];
</script>

{#if errors.length}
	<p
		class="error-message"
		out:fade={{ delay: 0, duration: 100 }}
		in:fly={{ y: -50, duration: 100 }}
	>
		{errors.map((error) => error).join(',')}
	</p>
{/if}

<style>
	.error-message {
		padding-top: 0.25rem;
		font-weight: 700;
		color: var(--error-background-color);
		text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
		transition: text-shadow 0.3s ease;
}

	.error-message:hover {
		text-shadow: 0 0 10px rgba(255, 0, 0, 5);
	}</style>
