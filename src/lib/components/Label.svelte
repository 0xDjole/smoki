<script lang="ts">
	import { _ } from 'svelte-i18n';
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

<style type="text/postcss">
	.thumbnail-wrapper {
		@apply flex items-end gap-x-2;
	}

	.label {
		@apply text-white text-lg font-bold md:text-2xl;
	}

	.thumbnail-container {
		@apply flex items-end;
	}

	.label-error {
		@apply text-error;
	}
</style>
