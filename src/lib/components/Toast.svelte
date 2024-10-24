<script lang="ts">
	import { run } from 'svelte/legacy';

	interface Props {
		message: string;
		type?: 'success' | 'error' | 'warning' | 'info';
	}

	let { message, type = 'info' }: Props = $props();

	let computedClass = $state('');
	run(() => {
		computedClass =
			type === 'success'
				? 'bg-green-500'
				: type === 'error'
				? 'bg-error'
				: type === 'warning'
				? 'bg-yellow-500'
				: 'bg-blue-500';
	});
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
		@apply rounded-md text-white font-bold w-full p-1 bg-success;
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
