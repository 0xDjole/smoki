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
let parentComponent;
export let height = 'calc(100vh - 55px - 80px)';
export let smallHeight = 'calc(100vh - 55px - 60px)';
export let listStyle = '';
const dispatch = createEventDispatcher();
let fetchingMore = false;
let parentHeight;
let spacer;
let currentItems = [];
let spacerHeight = 0;
let loadedMoreBottom = false;
$: if (!currentItems.length && component) {
    const height = parentHeight + 125 - (component.scrollHeight - spacerHeight);
    if (height > 0) {
        spacer.style.height = `${height}px`;
        spacerHeight = height;
    }
}
$: {
    if (component) {
        if (currentItems.length !== items.length) {
            tick().then(() => {
                const height = parentHeight + 125 - (component.scrollHeight - spacerHeight);
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
	bind:this={parentComponent}
	bind:clientHeight={parentHeight}
	class="wrap"
	id={`wrap-${id}`}
	style={`--height: ${height}; --smallHeight: ${smallHeight};`}
>
	<ul bind:this={component} style={`${listStyle}`} class="list" {id}>
		<div class="load-wrap">
			<svelte:component this={loaderComponent} />
		</div>

		{#each items as item, index}
			<svelte:component this={itemComponent} {item} {index} {...itemProps} />
		{/each}

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
	</ul>
</div>

<style>
	.spacer {
		width: 100%;
		flex-grow: 1;
	}

	.wrap {
		overflow: hidden;
		height: var(--smallHeight);
}

	@media (min-width: 768px) {

	.wrap {
			height: var(--height)
	}
		}

	.load-wrap {
		z-index: 10;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		display: grid;
		width: 100%;
		justify-content: center;
		height: 30px;
}

	.load-bottom {
		margin-bottom: 2rem;
}

	.list {
		z-index: 10;
		display: flex;
		flex-wrap: wrap;
		scroll-behavior: smooth;
		justify-content: center;
		align-content: start;
		overflow-y: scroll;
		max-height: var(--smallHeight);
}

	@media (min-width: 768px) {

	.list {
			max-height: var(--height)
	}
		}</style>
