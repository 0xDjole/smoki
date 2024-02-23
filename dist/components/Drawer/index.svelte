<script>
	import { onMount, onDestroy } from 'svelte';
	export let open = false;
	export let duration = 0.8;
	export let placement = 'right';
	export let size = null;
	export let zIndex = -1;
	export let height = null;
	export let width = null;
	export let left = null;
	export let targetElement = null;

	let w = '100%';

	let l = '0';

	let h = '100%';

	let percentageX = 0;

	$: if (left) {
		l = left;
	}

	$: if (height) {
		h = height;
	} else if (drawerTargetTop) {
		h = `calc(100% - ${drawerTargetTop}px)`;
	} else {
		h = `100%`;
	}

	$: if (width) {
		w = width;
	}

	$: transform =
		placement === 'right'
			? `transform: translate(${percentageX}%, 0);`
			: `transform: translate(0, ${percentageX}%);`;

	$: style = `--duration: ${duration}s; --size: ${size}; z-index: ${zIndex};
	 ${transform} height: ${h}; width: ${w}; left: ${l}px; top: ${drawerTargetTop}px`;

	$: if (open) {
		percentageX = 0;
	} else {
		percentageX = 100;
	}

	$: drawerTargetTop = targetElement?.getBoundingClientRect()?.top || 0;

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
</script>

<div class="drawer" {style} {placement}>
	<slot />
</div>

<style>
	.drawer {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		transition: transform var(--duration) ease;
	}</style>
