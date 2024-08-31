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
	let spacer;

	let currentItems = [];

	$: if (component) {
		tick().then(() => {
			const height = component.clientHeight + 10 - listComponent.scrollHeight;
			console.log('height', height);
			if (height > 0) {
				spacer.style.height = `${height}px`;
			} else {
				spacer.style.height = `0px`;
			}
			currentItems = [...items];
		});
	}

	onDestroy(() => {
		items = [];
	});

	onMount(async () => {
		if (fetchOnMount) {
			await fetchData(true, true);
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

			if (isFromTop) {
				items = [...responseItems];
			} else {
				items = [...items, ...responseItems];
			}

			await tick();
			fetchingMore = false;
		}

		if (isFromTop) {
			component.scrollTo({ top: 50 });
			return null;
		}

		if (!isFromTop && !responseItems.length) {
			component.scrollTo({ top: component.scrollHeight - component.clientHeight - 70 });
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

	<div bind:this={listComponent} class="list">
		{#if !currentItems.length}
			<span class="not-found">{$t(notFoundText)}</span>
		{/if}

		{#each items as item, index}
			<svelte:component this={itemComponent} {item} {index} {...itemProps} />
		{/each}
	</div>

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
	.not-found {
		@apply text-lg md:text-xl text-primary font-bold m-2 pt-8;
	}

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
