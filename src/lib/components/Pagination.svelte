<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';

	import InfiniteScroll from './InfiniteScroll.svelte';
	import Loader from './Loader.svelte';

	export let items = [];
	export let itemComponent;
	export let loaderComponent = Loader;
	export let fetchMore;
	export let fetchOnMount = true;
	export let itemProps;
	export let id;
	export let notFoundText;
	export let t;
	let component;
	let listComponent;

	export let height = '100%';

	export let listStyle = '';

	let fetchingMore = false;

	let parentHeight;
	let listHeight;
	let spacer;

	let currentItems = [];
	let spacerHeight = 0;

	let loadedMoreBottom = false;

	$: if (!currentItems.length && component && listComponent) {
		const height = component.clientHeight + 10 - listComponent.scrollHeight;
		if (height > 0) {
			spacer.style.height = `${height}px`;
			spacerHeight = height;
		}
	}

	$: {
		if (component) {
			if (currentItems.length !== items.length) {
				tick().then(() => {
					const height = component.clientHeight + 10 - listComponent.scrollHeight;
					if (height > 0) {
						spacer.style.height = `${height}px`;
						spacerHeight = height;

						if (!items.length) {
							component.style.scrollBehavior = 'auto';
							component.scrollTo({ top: 50 });
							component.style.scrollBehavior = 'smooth';
						}

						if (loadedMoreBottom) {
							component.scrollBy({ top: -75 });
						}
					} else {
						spacer.style.height = `0px`;
						spacerHeight = 0;
					}

					currentItems = items;
					loadedMoreBottom = false;
				});
			}
		}
	}

	onDestroy(() => {
		items = [];
	});

	onMount(async () => {
		if (fetchOnMount) {
			await fetchData(true);
		}
	});

	const fetchData = async (isFromTop: boolean, shouldFetch: boolean) => {
		if (fetchingMore || !component) {
			return null;
		}

		let responseItems = [];

		if (shouldFetch) {
			fetchingMore = true;
			responseItems = await fetchMore(isFromTop);

			if (!responseItems || !responseItems.length) {
				fetchingMore = false;

				setTimeout(() => {
					const byPixels = isFromTop ? 50 : -75;
					component?.scrollBy({ top: byPixels });
				}, 20);

				return null;
			}

			if (isFromTop) {
				items = [...responseItems];
			} else {
				items = [...items, ...responseItems];

				loadedMoreBottom = true;
			}

			fetchingMore = false;
		}

		if (isFromTop) {
			setTimeout(() => {
				component.scrollBy({ top: 50 });
			}, 20);
		}

		if (!isFromTop && !responseItems.length) {
			component.scrollTo({ top: component.scrollHeight - component.clientHeight - 75 });
		}
	};
</script>

<div
	bind:clientHeight={parentHeight}
	bind:this={component}
	style={`--height: ${height}; ${listStyle}`}
	class="pagination"
	{id}
>
	<div class="load-wrap">
		<svelte:component this={loaderComponent} />
	</div>

	<ul bind:this={listComponent} class="list">
		{#each items as item, index}
			<svelte:component this={itemComponent} {item} {index} {...itemProps} />
		{/each}
	</ul>

	{#if !fetchingMore && !items.length}
		<span class="text-lg md:text-xl text-primary font-bold m-2">{$t(notFoundText)}</span>
	{/if}

	<div class="spacer" bind:this={spacer} />

	<div class="load-wrap load-bottom">
		<svelte:component this={loaderComponent} />
	</div>

	<InfiniteScroll
		fetchTop={async (shouldFetch) => {
			await fetchData(true, shouldFetch);
		}}
		threshold={0}
		fetchBottom={async (shouldFetch) => {
			await fetchData(false, shouldFetch);
		}}
	/>
</div>

<style type="text/postcss">
	.spacer {
		width: 100%;
		flex-grow: 1;
	}

	.load-wrap {
		@apply flex justify-center w-full my-2;
		height: 30px;
	}
	.load-bottom {
		@apply mb-8;
	}

	.pagination {
		@apply flex flex-wrap scroll-smooth;
		justify-content: center;
		align-content: start;
		overflow-y: scroll;
		height: var(--height);
	}

	.list {
		@apply flex flex-wrap w-full justify-center;
	}
</style>
