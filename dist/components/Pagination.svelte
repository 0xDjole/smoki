<script>import { onDestroy, onMount, tick } from 'svelte';
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
let spacer;
$: if (component && items) {
    tick().then(() => {
        const height = component.clientHeight + 10 - listComponent.scrollHeight;
        if (height > 0) {
            spacer.style.height = `${height}px`;
        }
        else {
            spacer.style.height = `0px`;
        }
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
const fetchData = async (isFromTop, shouldFetch) => {
    if (fetchingMore || !component) {
        return null;
    }
    let responseItems = [];
    if (shouldFetch) {
        fetchingMore = true;
        responseItems = await fetchMore(isFromTop);
        if (isFromTop) {
            items = [...responseItems];
        }
        else {
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
</script>

<div bind:this={component} style={`--height: ${height}; ${listStyle}`} class="pagination" {id}>
	<div class="load-wrap">
		<svelte:component this={loaderComponent} />
	</div>

	<div bind:this={listComponent} class="list">
		{#if !items.length}
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

<style>
	.not-found {
		margin: 0.5rem;
		padding-top: 2rem;
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 700;
		color: var(--primary-text-color);
}

@media (min-width: 768px) {

		.not-found {
				font-size: 1.25rem;
				line-height: 1.75rem;
		}
}

	.spacer {
		width: 100%;
		flex-grow: 1;
	}

	.load-wrap {
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
