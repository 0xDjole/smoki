<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onDestroy, onMount, tick } from 'svelte';

	import InfiniteScroll from './InfiniteScroll.svelte';
	import Loader from './Loader.svelte';

	let component = $state();
	let listComponent = $state();


	interface Props {
		items?: any;
		itemComponent: any;
		loaderComponent?: any;
		fetchMore: any;
		fetchOnMount?: boolean;
		itemProps: any;
		id: any;
		notFoundText: any;
		t: any;
		height?: string;
		listStyle?: string;
	}

	let {
		items = $bindable([]),
		itemComponent,
		loaderComponent = Loader,
		fetchMore,
		fetchOnMount = true,
		itemProps,
		id,
		notFoundText,
		t,
		height = '100%',
		listStyle = ''
	}: Props = $props();

	let fetchingMore = false;

	let spacer = $state();

	run(() => {
		if (component && items) {
			tick().then(() => {
				const height = component.clientHeight + 10 - listComponent.scrollHeight;

				if (height > 0) {
					spacer.style.height = `${height}px`;
				} else {
					spacer.style.height = `0px`;
				}
			});
		}
	});

	let mounted = $state(false);

	onDestroy(() => {
		items = [];
	});

	onMount(async () => {
		if (fetchOnMount) {
			await fetchData(true, true);
		}
		mounted = true;
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

			fetchingMore = false;
		}

		await tick();

		if (isFromTop) {
			component.scrollTo({ top: 50 });
			return null;
		}

		if (!isFromTop && !responseItems.length) {
			component.scrollTo({ top: component.scrollHeight - component.clientHeight - 70 });
		}
	};

	const SvelteComponent = $derived(loaderComponent);
</script>

<div bind:this={component} style={`--height: ${height}; ${listStyle}`} class="pagination" {id}>
	<div class="load-wrap">
		<SvelteComponent />
	</div>

	<div bind:this={listComponent} class="list">
		{#if !items.length}
			<span class="not-found">{$t(notFoundText)}</span>
		{/if}

		{#each items as item, index}
			{@const SvelteComponent_1 = itemComponent}
			<SvelteComponent_1 {item} {index} {...itemProps} />
		{/each}
	</div>

	<div class="spacer" bind:this={spacer}></div>

	<div class="load-wrap load-bottom">
		<SvelteComponent />
	</div>

	{#if mounted}
		<InfiniteScroll
			fetchTop={async (shouldFetch) => {
				await fetchData(true, shouldFetch);
			}}
			threshold={0}
			fetchBottom={async (shouldFetch) => {
				await fetchData(false, shouldFetch);
			}}
		/>
	{/if}
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
