<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onMount, onDestroy } from 'svelte';
	interface Props {
		open?: boolean;
		duration?: number;
		placement?: string;
		size?: any;
		zIndex?: any;
		height?: any;
		width?: any;
		left?: any;
		targetElement?: any;
		bindHeightToTarget?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		open = $bindable(false),
		duration = 0.8,
		placement = 'right',
		size = null,
		zIndex = -1,
		height = null,
		width = null,
		left = null,
		targetElement = null,
		bindHeightToTarget = false,
		children
	}: Props = $props();

	let w = $state('100%');

	let l = $state('0');

	let h = $state('100%');

	let percentageX = $state(0);

	function updatePosition() {
		if (typeof window !== 'undefined' && targetElement) {
			drawerTargetTop = targetElement.getBoundingClientRect().top;
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', updatePosition);
			updatePosition(); // initial calculation
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', updatePosition);
		}
	});
	run(() => {
		if (left) {
			l = left;
		}
	});
	let drawerTargetTop;
	run(() => {
		drawerTargetTop = targetElement?.getBoundingClientRect()?.top || 0;
	});
	run(() => {
		if (height) {
			h = height;
		} else if (drawerTargetTop) {
			if (bindHeightToTarget) {
				h = `${targetElement.offsetHeight}px`;
			} else {
				h = `calc(100% - ${drawerTargetTop}px)`;
			}
		} else {
			h = `100%`;
		}
	});
	run(() => {
		if (width) {
			w = width;
		}
	});
	run(() => {
		if (open) {
			percentageX = 0;
		} else {
			percentageX = 100;
		}
	});
	let transform = $derived(
		placement === 'right'
			? `transform: translate(${percentageX}%, 0);`
			: `transform: translate(0, ${percentageX}%);`
	);
	let style = $derived(`--duration: ${duration}s; --size: ${size}; z-index: ${zIndex};
	 ${transform} height: ${h}; width: ${w}; left: ${l}px; top: ${drawerTargetTop}px`);
</script>

<div class="drawer" {style} {placement}>
	{@render children?.()}
</div>

<style type="text/postcss">
	.drawer {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		transition: transform var(--duration) ease;
	}
</style>
