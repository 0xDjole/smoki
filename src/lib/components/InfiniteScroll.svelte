<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onDestroy } from 'svelte';

	interface Props {
		threshold?: number;
		horizontal?: boolean;
		fetchTop?: any;
		fetchBottom?: any;
	}

	let {
		threshold = 0,
		horizontal = false,
		fetchTop = () => {},
		fetchBottom = () => {}
	}: Props = $props();

	let component = $state();
	let clearTopTimeoutId;
	let clearBottomTimeoutId;


	const onScroll = (e) => {
		clearTimeout(clearTopTimeoutId);
		clearTimeout(clearBottomTimeoutId);

		const offset = horizontal
			? e.target.scrollWidth - e.target.clientWidth - e.target.scrollLeft
			: e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop;

		if (e.target.scrollTop === 0) {
			clearTopTimeoutId = setTimeout(() => {
				fetchTop(true);
			}, 300);
			return null;
		}

		if (e.target.scrollTop > 0 && e.target.scrollTop <= 50) {
			clearTopTimeoutId = setTimeout(() => {
				fetchTop(false);
			}, 200);
			return null;
		}

		if (offset <= threshold + 3) {
			clearBottomTimeoutId = setTimeout(() => {
				fetchBottom(true);
			}, 200);
			return null;
		}

		if (offset > threshold && offset < 75) {
			clearBottomTimeoutId = setTimeout(() => {
				fetchBottom(false);
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
	run(() => {
		if (component) {
			const element = component.parentNode;

			setTimeout(() => {
				element.addEventListener('scroll', onScroll);
				element.addEventListener('resize', onScroll);
			}, 10);
		}
	});
</script>

<div bind:this={component} style="width:0px"></div>
