<script>import { _ } from 'svelte-i18n';
import Thumbnail from './Thumbnail/index.svelte';
export let label = '';
export let labelThumbnail = null;
export let errors = [];
</script>

{#if label}
	<div class="thumbnail-wrapper">
		{#if labelThumbnail}
			<div class="thumbnail-container">
				<Thumbnail size="sm" url={labelThumbnail.url} alt="Category thumbnail" />
			</div>
		{/if}
		<div class:label-error={errors.length} for={label} class="label">{$_(label)}</div>
	</div>
{/if}

<style>
	.thumbnail-wrapper {
		display: flex;
		align-items: flex-end;
		-moz-column-gap: 0.5rem;
		     column-gap: 0.5rem;
}

	.label {
		font-weight: 700;
		--tw-text-opacity: 1;
		color: rgb(255 255 255 / var(--tw-text-opacity));
}

	@media (min-width: 768px) {

		.label {
				font-size: 1.25rem;
				line-height: 1.75rem;
		}
}

	.thumbnail-container {
		display: flex;
		align-items: flex-end;
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
		color: var(--error-background-color);
		animation: shake 0.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		perspective: 1000px;
}</style>
