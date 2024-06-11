<script lang="ts">
	import Thumbnail from './Thumbnail/index.svelte';
	export let label = '';
	export let labelThumbnail = null;
	export let isRequired;
	export let errors = [];
	export let t;
</script>

{#if label}
	<div class="thumbnail-wrapper">
		{#if labelThumbnail}
			<div class="thumbnail-container">
				<Thumbnail size="sm" url={labelThumbnail.url} alt="Category thumbnail" />
			</div>
		{/if}
		<div class:label-error={errors.length} for={label} class="label">{t ? $t(label) : label}</div>
		{#if isRequired}
			<span class="required">*</span>
		{/if}
	</div>
{/if}

<style type="text/postcss">
	.required {
		@apply text-xl font-bold text-error relative align-top inline-block;
	}

	.thumbnail-wrapper {
		@apply flex items-end gap-x-2;
	}

	.label {
		@apply text-white font-bold md:text-xl;
	}

	.thumbnail-container {
		@apply flex items-end;
	}

	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25%,
		75% {
			transform: translateX(-5px);
		}
		50% {
			transform: translateX(5px);
		}
	}

	.label-error {
		@apply text-error;
		animation: shake 0.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		perspective: 1000px;
	}
</style>
