<script lang="ts">
	import ErrorMessage from '../ErrorMessage.svelte';

	export let kind;
	export let onChange = (value) => {};
	export let placeholder;
	export let accept = '';
	export let value;
	export let type = 'text';
	export let style = '';
	export let errors = [];
	export let label = '';
</script>

<div class="w-full">
	{#if label}
		<label class:label-error={errors.length} for={label} class="label">{label}</label>
	{/if}

	{#if type === 'password'}
		<input
			bind:value
			type="password"
			class:primary={kind === 'primary'}
			class:error-input={errors.length}
			{style}
			{placeholder}
			{accept}
			on:input={(e) => {
				e.preventDefault();
				errors = [];
				onChange(e.target.value);
			}}
		/>
	{/if}

	{#if type === 'text'}
		<input
			bind:value
			type="text"
			class:primary={kind === 'primary'}
			class:error-input={errors.length}
			{style}
			{placeholder}
			{accept}
			on:input={(e) => {
				e.preventDefault();
				errors = [];
				onChange(e.target.value);
			}}
		/>
	{/if}

	{#if type === 'number'}
		<input
			bind:value
			type="number"
			class:primary={kind === 'primary'}
			class:error-input={errors.length}
			{style}
			{placeholder}
			{accept}
			on:input={(e) => {
				e.preventDefault();
				errors = [];
				onChange(e.target.value);
			}}
		/>
	{/if}

	<ErrorMessage {errors} />
</div>

<style type="text/postcss">
	.primary {
		@apply w-full p-2 bg-secondary text-primary rounded-lg  border-secondary  font-semibold text-2xl outline-none text-opacity-80;
		transition: all 0.3s ease;
	}

	.error-input {
		@apply border-error;
		box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
		transition: border 0.3s ease;
		animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		&:hover {
			box-shadow: 0 0 15px rgba(255, 0, 0, 0.7);
		}
	}

	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}
		20%,
		80% {
			transform: translate3d(2px, 0, 0);
		}
		30%,
		50%,
		70% {
			transform: translate3d(-4px, 0, 0);
		}
		40%,
		60% {
			transform: translate3d(4px, 0, 0);
		}
	}

	.label {
		@apply text-primary text-2xl mb-2 font-bold;
	}

	.label-error {
		@apply text-error;
	}
</style>
