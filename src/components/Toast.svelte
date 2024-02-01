<script lang="ts">
	export let message: string;
	export let type: 'success' | 'error' | 'warning' | 'info' = 'info';

	let computedClass = '';
	$: computedClass =
		type === 'success'
			? 'bg-green-500'
			: type === 'error'
				? 'bg-error'
				: type === 'warning'
					? 'bg-yellow-500'
					: 'bg-blue-500';
</script>

<div class="toast notificator {computedClass}">
	<div class="toast-content">
		{#if type === 'success'}
			<span class="icon">✔️</span>
		{:else if type === 'error'}
			<span class="icon">❌</span>
		{:else if type === 'warning'}
			<span class="icon">⚠️</span>
		{:else}
			<span class="icon">ℹ️</span>
		{/if}
		<span class="message">{message}</span>
	</div>
</div>

<style type="text/postcss">
	.toast {
		@apply rounded-md text-primary font-bold w-full p-1 bg-success;
	}

	.toast-content {
		@apply flex items-center;
	}

	.icon {
		@apply text-xl mr-2;
	}

	.message {
		@apply text-sm;
	}
</style>
