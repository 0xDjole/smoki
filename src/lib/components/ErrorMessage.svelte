<script lang="ts">
	import { fly, fade } from 'svelte/transition';

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

<style type="text/postcss">
	.error-message {
		@apply text-error font-bold pt-1;
		text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
		transition: text-shadow 0.3s ease;
	}

	.error-message:hover {
		text-shadow: 0 0 10px rgba(255, 0, 0, 5);
	}
</style>
