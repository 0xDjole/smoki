<script>import { STORAGE_URL } from '../../utils/env';
import SvgIcon from '../SvgIcon.svelte';
import DefaultThumnail from '../../utils/icons/defaultThumbnail.svg?raw';
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

<style>
	.thumbnail {

    height: 3rem;

    width: 3rem;

    overflow: hidden;

    border-radius: 9999px;

    --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

    --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);

    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

@media (min-width: 640px) {

    .thumbnail {

        height: 4rem;

        width: 4rem
    }
}

	.image {

    height: 100%;

    width: 100%
}</style>
