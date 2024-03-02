<script>
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { Navigation, Pagination } from 'swiper/modules';
	import 'swiper/swiper-bundle.css';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import 'photoswipe/style.css';
	import { STORAGE_URL } from '../../utils/env';

	export let items = [];

	let swiperInstance;
	let lightbox;

	// Prepare items for Swiper
	let swiperItems = items.map((item) => ({
		src: `${STORAGE_URL}/${item.url}`,
		title: item.title || 'No title'
	}));

	onMount(() => {
		swiperInstance = new Swiper('.swiper-container', {
			modules: [Navigation, Pagination],
			pagination: { el: '.swiper-pagination' },
			navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
		});

		lightbox = new PhotoSwipeLightbox({
			gallery: '.swiper-wrapper',
			children: 'a',
			pswpModule: () => import('photoswipe')
		});
		lightbox.init();
	});
</script>

<div class="swiper-container">
	<div class="swiper-wrapper">
		{#each swiperItems as item, index}
			<div class="swiper-slide">
				<a
					href={item.src}
					data-pswp-width="600"
					data-pswp-height="400"
					target="_blank"
					rel="noopener noreferrer"
					class="link-image"
				>
					<img src={item.src} alt={item.title} style="width: 100%; height: auto;" />
				</a>
			</div>
		{/each}
	</div>
	<!-- Add Swiper navigation buttons -->
	<div class="swiper-pagination" />
	<div class="swiper-button-prev" />
	<div class="swiper-button-next" />
</div>

<style type="text/postcss">
	.link-image {
		@apply flex justify-center h-full;
	}
	.swiper-container {
		@apply flex w-full h-full;
	}
	.swiper-slide {
		/* Center slides */
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
