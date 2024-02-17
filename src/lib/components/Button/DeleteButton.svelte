<script lang="ts">
	import Close from '../../utils/icons/close.svg?raw';
	import SvgIcon from '../SvgIcon.svelte';

	export let position = '';

	export let onClick = () => {};

	const parsePosition = (position) => {
		if (position === 'right') {
			return 'right';
		}
		if (position === 'left') {
			return 'left';
		}
	};
</script>

<span class={`remove ${parsePosition(position)}`} on:click={onClick}>
	<SvgIcon data={Close} size={'30px'} color={'white'} />
</span>

<style type="text/postcss">
	.remove {
		@apply grid items-center cursor-pointer;
	}

	.right {
		@apply absolute right-0 top-0 p-2;
	}

	.left {
		@apply absolute left-0 top-0 p-2;
	}
</style>
