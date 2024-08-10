<script lang="ts">
	import ErrorMessage from '../ErrorMessage.svelte';
	import Label from '../Label.svelte';

	export let kind;
	export let onChange = (value) => {};
	export let placeholder;
	export let accept = '';
	export let value;
	export let type = 'text';
	export let style = '';
	export let errors = [];
	export let label = '';
	export let labelThumbnail;
	export let t;
	export let isRequired;
	export let clearErrorsOnInput = true;
</script>

<div class="w-full">
	<Label {isRequired} {t} {label} {errors} {labelThumbnail} />

	{#if type === 'password'}
		<input
			bind:value
			type="password"
			class:primary={kind === 'primary'}
			class:error-input={errors.length}
			{style}
			placeholder={$t(placeholder)}
			{accept}
			on:input={(e) => {
				e.preventDefault();

				if (clearErrorsOnInput) {
					errors = [];
				}

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
			placeholder={$t(placeholder)}
			{accept}
			on:input={(e) => {
				e.preventDefault();

				if (clearErrorsOnInput) {
					errors = [];
				}

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
			placeholder={$t(placeholder)}
			{accept}
			on:input={(e) => {
				e.preventDefault();

				if (clearErrorsOnInput) {
					errors = [];
				}

				onChange(e.target.value);
			}}
		/>
	{/if}

	<ErrorMessage {t} {errors} />
</div>

<style type="text/postcss">
	.primary {
		@apply w-full p-1 bg-secondary text-primary rounded-lg  font-semibold md:text-xl outline-none text-opacity-80 border-primary;
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
</style>
