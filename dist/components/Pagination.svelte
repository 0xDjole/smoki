<script>import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';
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
let component;
let listComponent;
export let height = '100%';
export let listStyle = '';
const dispatch = createEventDispatcher();
let fetchingMore = false;
let parentHeight;
let listHeight;
let spacer;
let currentItems = [];
let spacerHeight = 0;
let loadedMoreBottom = false;
$: if (!currentItems.length && component) {
    const height = parentHeight + 10 - listComponent.scrollHeight;
    if (height > 0) {
        spacer.style.height = `${height}px`;
        spacerHeight = height;
    }
}
$: {
    if (component) {
        if (currentItems.length !== items.length) {
            tick().then(() => {
                const height = parentHeight + 10 - listComponent.scrollHeight;
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
                }
                else {
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
        dispatch('firstLoad');
    }
});
const fetchData = async (isFromTop) => {
    if (fetchingMore || !component) {
        return null;
    }
    fetchingMore = true;
    let responseItems = await fetchMore(false);
    if (!responseItems || !responseItems.length) {
        fetchingMore = false;
        setTimeout(() => {
            const byPixels = isFromTop ? 50 : -75;
            component?.scrollBy({ top: byPixels });
        }, 20);
        return null;
    }
    items = [...items, ...responseItems];
    loadedMoreBottom = true;
    fetchingMore = false;
    if (isFromTop) {
        setTimeout(() => {
            component.scrollBy({ top: 50 });
        }, 20);
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
		<div class="py-5"><span class="text-2xl text-primary font-bold">{notFoundText}</span></div>
	{/if}

	<div class="spacer" bind:this={spacer} />

	<div class="load-wrap load-bottom">
		<svelte:component this={loaderComponent} />
	</div>

	<InfiniteScroll
		on:topScrollReset={async (e) => {
			if (e.detail.fetchData) {
				const responseItems = await fetchMore(true);
				const showedOnTop = items.filter((item) => item.showTop === true);
				items = [...showedOnTop, ...responseItems];
			}

			component.scrollTo({ top: 50 });
		}}
		hasMore={true}
		threshold={0}
		on:bottomScrollReset={async (e) => {
			if (e.detail.fetchData) {
				await fetchData(false);
			} else {
				component.scrollTo({ top: component.scrollHeight - component.clientHeight - 75 });
			}
		}}
	/>
</div>

<style>
	.spacer {
		width: 100%;
		flex-grow: 1;
	}

	.load-wrap {
		z-index: 10;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		display: flex;
		width: 100%;
		justify-content: center;
		height: 30px;
}

	.load-bottom {
		margin-bottom: 2rem;
}

	.pagination {
		z-index: 10;
		display: flex;
		flex-wrap: wrap;
		scroll-behavior: smooth;
		justify-content: center;
		align-content: start;
		overflow-y: scroll;
		height: var(--height);
}

	.list {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		justify-content: center;
}</style>
