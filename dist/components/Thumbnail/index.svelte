<script>import { STORAGE_URL } from '../../utils/env';
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

<style>
	.thumbnail {

    overflow: hidden;

    border-radius: 9999px;

    --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

    --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);

    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

	.md {

    height: 3rem;

    width: 3rem
}

	@media (min-width: 640px) {

    .md {

        height: 4rem;

        width: 4rem
    }
}

	.sm {

    height: 2rem;

    width: 2rem
}

	@media (min-width: 640px) {

    .sm {

        height: 2.25rem;

        width: 2.25rem
    }
}

	.image {

    height: 100%;

    width: 100%
}</style>
