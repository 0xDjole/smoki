<script lang="ts">
	import ErrorMessage from '../ErrorMessage.svelte';
	import Label from '../Label.svelte';

	export let kind;
	export let onChange = (value) => {};
	export let placeholder;
	export let value;
	export let type = 'text';
	export let style = '';
	export let errors = [];
	export let label = '';
	export let labelThumbnail;
	export let t;
	export let minLength = 0;
	export let maxLength = 2000;
	export let isDisabled = false;
</script>

<div class="w-full">
	<Label isRequired={minLength > 0} {t} {label} {errors} {labelThumbnail} />

	<div class="text-area">
		{#if t}
			<textarea
				bind:value
				disabled={isDisabled}
				minlength={minLength}
				maxlength={maxLength}
				class="primary"
				class:error-input={errors.length}
				{style}
				placeholder={placeholder
					? `${$t('placeholder')}`
					: `${$t('enter')}  ${$t('between')} ${minLength} ${$t('and')} ${maxLength}`}
				on:input={(e) => {
					e.preventDefault();
					errors = [];
					onChange(e.target.value);
				}}
			/>
		{/if}

		{#if !isDisabled}
			<div
				class="used"
				class:error-text={value?.length < minLength}
				class:success-text={value?.length >= minLength}
			>
				{#if minLength}
					<div>
						Min {minLength}
					</div>
				{/if}

				<div>
					{value?.length || 0} / {maxLength}
				</div>
			</div>
		{/if}
	</div>
	<ErrorMessage {t} {errors} />
</div>

<style type="text/postcss">
	.error-text {
		@apply text-error;
	}

	.success-text {
		@apply text-success;
	}

	.used {
		@apply flex gap-x-3 absolute bottom-5 right-5 font-bold;
	}

	.text-area {
		@apply relative;
	}

	.primary {
		@apply w-full p-1 bg-secondary text-primary rounded-lg  font-semibold text-lg md:text-xl outline-none text-opacity-80 resize-none;
		transition: all 0.3s ease;
		min-height: 80px;
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
