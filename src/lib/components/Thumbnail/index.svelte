<script lang="ts">
	import { STORAGE_URL } from '../../utils/env';
	import SvgIcon from '../SvgIcon.svelte';

	import NoImage from '../../utils/icons/no-image.svg?raw';

	import { onMount } from 'svelte';

	export let url = null;
	export let isPrefix = true;
	export let alt = 'thumbnail';
	export let size = 'md';

	$: src = isPrefix ? `${STORAGE_URL}/${url}` : url;

	let imageValid = true;

	function handleImageError() {
		imageValid = false;
	}

	onMount(() => {
		const img = new Image();
		img.src = src;
		img.onload = () => (imageValid = true);
		img.onerror = handleImageError;
	});
</script>

<div class={`thumbnail`} class:sm={size === 'sm'} class:md={size === 'md'}>
	{#if imageValid}
		<img class="image" {alt} {src} on:error={handleImageError} />
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
