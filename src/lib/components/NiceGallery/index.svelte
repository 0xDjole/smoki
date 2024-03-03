<script>
	import { onMount, onDestroy } from 'svelte';
	import Swiper from 'swiper';
	import { Navigation, Pagination } from 'swiper/modules';
	import 'swiper/swiper-bundle.css';

	import { STORAGE_URL } from '../../utils/env';

	// Access Fancybox from the imported module
	import '@fancyapps/ui/dist/fancybox/fancybox.css';

	export let items = [];
	export let galleryID = 'gallery';

	let swiperInstance;

	let swiperItems = items.map((item) => ({
		src: `${STORAGE_URL}/${item.url}`,
		title: item.title || 'No title'
	}));

	let Fancybox;

	onMount(async () => {
		swiperInstance = new Swiper('.swiper-container', {
			modules: [Navigation, Pagination],
			pagination: { el: '.swiper-pagination' },
			navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
			lazy: true // Enable lazy loading
		});

		const module = await import('@fancyapps/ui');
		Fancybox = module.Fancybox;
		Fancybox.bind('.link-image img', {
			Hash: false
		});
	});

	// Proper cleanup to prevent memory leaks
	onDestroy(() => {
		if (swiperInstance) swiperInstance.destroy(true, true);
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
					<img
						data-fancybox="gallery"
						src={item.src}
						alt={item.title}
						loading="lazy"
						style="width: 100%; height: auto;"
					/>
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
