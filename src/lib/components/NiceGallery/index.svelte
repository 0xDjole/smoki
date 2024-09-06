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
	export let isOpened = false;

	let swiperInstance;
	let Fancybox;

	$: swiperItems = items.map((item) => ({
		src: `${STORAGE_URL}/${item.url}`,
		title: item.title || 'No title',
		isVideo: item.url.endsWith('.mp4') // Check if the URL ends with .mp4
	}));

	let isFirstSlide = true;
	let isLastSlide = false;

	onMount(async () => {
		swiperInstance = new Swiper('.swiper-container', {
			modules: [Navigation, Pagination],
			pagination: { el: '.swiper-pagination' },
			navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
			lazy: true // Enable lazy loading
		});

		swiperInstance.on('slideChange', () => {
			isFirstSlide = swiperInstance.isBeginning;
			isLastSlide = swiperInstance.isEnd;
		});

		const module = await import('@fancyapps/ui');
		Fancybox = module.Fancybox;
		Fancybox.bind('.link-image img', {
			Hash: false,
			on: {
				reveal: () => {
					isOpened = true;
				},
				close: () => {
					isOpened = false;
				}
			}
		});
	});

	onDestroy(() => {
		if (swiperInstance) swiperInstance.destroy(true, true);
	});

	$: if (!isOpened && Fancybox) {
		Fancybox.close(true);
	}
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
					{#if item.isVideo}
						<video
							data-fancybox="gallery"
							class="slide-img"
							src={item.src}
							controls
							loading="lazy"
						/>
					{:else}
						<img
							class="slide-img"
							data-fancybox="gallery"
							src={item.src}
							alt={item.title}
							loading="lazy"
						/>
					{/if}
				</a>
			</div>
		{/each}
	</div>
	<!-- Add Swiper navigation buttons -->
	<div class="swiper-pagination" />
	<div class="btn swiper-button-prev" class:hidden-btn={isFirstSlide} />
	<div class="btn swiper-button-next" class:hidden-btn={isLastSlide} />
</div>

<style type="text/postcss">
	.btn {
		@apply text-white;
		text-shadow: -0.5px -0.5px 0 #eee, 0.5px -0.5px 0 #eee, -0.5px 0.5px 0 #eee, 0.5px 0.5px 0 #eee; /* Very light gray outline */
	}

	.slide-img {
		@apply w-full object-cover;
	}

	.swiper-pagination {
		z-index: 1;
	}

	.link-image {
		@apply flex justify-center w-full h-full;
	}
	.swiper-container {
		@apply absolute top-0 left-0 flex w-full h-full overflow-hidden;
	}
	.swiper-slide {
		@apply flex justify-center;
	}
	.hidden-btn {
		@apply hidden;
	}
</style>
