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

         column-gap: 0.5rem
}

	.label {

    font-size: 1.125rem;

    line-height: 1.75rem;

    font-weight: 700;

    --tw-text-opacity: 1;

    color: rgb(255 255 255 / var(--tw-text-opacity))
}

	@media (min-width: 768px) {

    .label {

        font-size: 1.5rem;

        line-height: 2rem
    }
}

	.thumbnail-container {

    display: flex;

    align-items: flex-end
}

	.label-error {

    color: var(--error-background-color)
}</style>
