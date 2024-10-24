<script lang="ts">
	import { run } from 'svelte/legacy';

	import { STORAGE_URL } from '../../utils/env';
	import SvgIcon from '../SvgIcon.svelte';
	import NoImage from '../../utils/icons/no-image.svg?raw';

	interface Props {
		url?: any;
		isPrefix?: boolean;
		alt?: string;
		size?: string;
	}

	let {
		url = null,
		isPrefix = true,
		alt = 'thumbnail',
		size = 'md'
	}: Props = $props();

	let src = $derived(isPrefix ? `${STORAGE_URL}/${url}` : url);
	let imageValid = $state(true);

	function handleImageError() {
		imageValid = false;
	}

	run(() => {
		if (src) {
			imageValid = true; // Reset the validation state
			const img = new Image();
			img.src = src;
			img.onload = () => (imageValid = true);
			img.onerror = handleImageError;
		}
	});
</script>

<div class="thumbnail" class:sm={size === 'sm'} class:md={size === 'md'}>
	{#if imageValid}
		<img class="image" {alt} {src} onerror={handleImageError} />
	{:else}
		<SvgIcon data={NoImage} color={'var(--secondary-text-color)'} />
	{/if}
</div>

<style type="text/postcss">
	.thumbnail {
		@apply rounded-full overflow-hidden shadow-md;
	}
	.md {
		@apply w-12 h-12 sm:w-16 sm:h-16;
	}
	.sm {
		@apply w-8 h-8 sm:w-9 sm:h-9;
	}
	.image {
		@apply h-full w-full;
	}
</style>
