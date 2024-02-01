<script lang="ts">
	export let kind = '';
	export let onClick;
	export let end = false;
	export let size = '';
	export let style = '';
	export let disabled = false;
	export let className = '';
</script>

<button
	class={`base ${kind === 'submit' ? 'submit' : ''} ${size === 'small' ? 'small' : ''} ${
		end ? 'end' : ''
	} ${disabled ? 'disabled' : ''} ${className}`}
	{style}
	title={disabled ? 'Choose an item and date' : ''}
	on:click={(e) => {
		e.preventDefault();
		onClick();
	}}><slot /></button
>

<style type="text/postcss">
	.base {
		@apply w-full bg-accent text-primary rounded-lg  border-secondary  font-semibold p-2 cursor-pointer hover:bg-secondary hover:text-success whitespace-nowrap text-2xl;
	}

	.submit {
		@apply mt-5 text-3xl p-4;
	}

	.small {
		@apply p-1 m-0 w-fit h-full text-lg;
	}

	.end {
		@apply self-end;
	}
	.disabled {
		@apply opacity-50;
	}
</style>
