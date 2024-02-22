<script>
	import { onDestroy, createEventDispatcher } from 'svelte';

	export let threshold = 0;
	export let horizontal = false;
	export let hasMore = true;

	const dispatch = createEventDispatcher();

	let component;
	let clearTopTimeoutId;
	let clearBottomTimeoutId;

	$: {
		if (component) {
			const element = component.parentNode;

			element.addEventListener('scroll', onScroll);
			element.addEventListener('resize', onScroll);
		}
	}

	const onScroll = (e) => {
		clearTimeout(clearTopTimeoutId);
		clearTimeout(clearBottomTimeoutId);

		const offset = horizontal
			? e.target.scrollWidth - e.target.clientWidth - e.target.scrollLeft
			: e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop;

		if (e.target.scrollTop === 0) {
			clearTopTimeoutId = setTimeout(() => {
				dispatch('topScrollReset', { fetchData: true });
			}, 300);
		}

		if (e.target.scrollTop > 0 && e.target.scrollTop < 50) {
			clearTopTimeoutId = setTimeout(() => {
				dispatch('topScrollReset', { fetchData: false });
			}, 200);
		}

		if (offset <= threshold + 3) {
			if (hasMore) {
				clearBottomTimeoutId = setTimeout(() => {
					dispatch('bottomScrollReset', { fetchData: true });
				}, 200);
				return null;
			}
		}

		if (offset > threshold && offset < 75) {
			clearBottomTimeoutId = setTimeout(() => {
				dispatch('bottomScrollReset', { fetchData: false });
			}, 100);
		}
	};

	onDestroy(() => {
		if (component) {
			const element = component.parentNode;

			element.removeEventListener('scroll', null);
			element.removeEventListener('resize', null);
		}
	});
</script>

<div bind:this={component} style="width:0px" />
