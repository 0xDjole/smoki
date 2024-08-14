<script>export let message;
export let type = 'info';
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

<style>
	.toast {

    width: 100%;

    border-radius: 0.375rem;

    background-color: var(--success-background-color);

    padding: 0.25rem;

    font-weight: 700;

    --tw-text-opacity: 1;

    color: rgb(255 255 255 / var(--tw-text-opacity))
}

	.toast-content {

    display: flex;

    align-items: center
}

	.icon {

    margin-right: 0.5rem;

    font-size: 1.25rem;

    line-height: 1.75rem
}

	.message {

    font-size: 0.875rem;

    line-height: 1.25rem
}</style>
