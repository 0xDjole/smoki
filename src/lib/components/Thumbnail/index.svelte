<script lang="ts">
	import { STORAGE_URL } from '$lib/utils/env';
	import SvgIcon from '$lib/utils/components/SvgIcon.svelte';
	import DefaultThumnail from '$lib/utils/icons/defaultThumbnail.svg?raw';

	import { onMount } from 'svelte';

	export let url = null;
	export let isPrefix = true;
	export let alt = 'thumbnail';

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

<div class="thumbnail">
	{#if imageValid}
		<img class="image" {alt} {src} on:error={handleImageError} />
	{:else}
		<SvgIcon data={DefaultThumnail} color={'white'} />
	{/if}
</div>

<style type="text/postcss">
	.thumbnail {
		@apply w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-md;
	}

	.image {
		@apply h-full w-full;
	}
</style>
