<script>
	import { onMount } from 'svelte';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import 'photoswipe/style.css';
	import { STORAGE_URL } from '../../utils/env';

	// Accept items as a prop
	export let items = [];
	export let galleryID;

	// Transform items to match PhotoSwipe's expected format
	let galleryItems = items.map((item) => ({
		src: `${STORAGE_URL}/${item.url}`,
		w: 600, // Default width, consider dynamically determining or passing these values
		h: 400, // Default height, consider dynamically determining or passing these values
		title: item.title || 'No title' // Use the title if available, or provide a default
	}));

	onMount(() => {
		let lightbox = new PhotoSwipeLightbox({
			gallery: '#' + galleryID,
			children: 'a',
			showHideAnimationType: 'zoom',
			pswpModule: () => import('photoswipe')
		});
		lightbox.init();
	});
</script>

<div class="pswp-gallery" id={galleryID}>
	{#each galleryItems as item}
		<a
			href={item.src}
			data-pswp-width={item.width}
			data-pswp-height={item.height}
			target="_blank"
			rel="noreferrer"
		>
			<img src={item.src} alt="" />
		</a>
	{/each}
</div>
