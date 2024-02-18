<script lang="ts">
	import Plus from '../../utils/icons/plus.svg?raw';
	import Close from '../../utils/icons/close.svg?raw';
	import Less from '../../utils/icons/less.svg?raw';
	import User from '../../utils/icons/user.svg?raw';
	import Search from '../../utils/icons/search.svg?raw';
	import SvgIcon from '../SvgIcon.svelte';

	export let svgName = '';
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

	const parseSvgName = (svgName) => {
		if (svgName === 'back') {
			return Less;
		}
		if (svgName === 'delete') {
			return Close;
		}

		if (svgName === 'add') {
			return Plus;
		}

		if (svgName === 'user') {
			return User;
		}

		if (svgName === 'search') {
			return Search;
		}
	};
</script>

<span class={`remove ${parsePosition(position)}`} on:click={onClick}>
	<SvgIcon data={parseSvgName(svgName)} size={'30px'} color={'white'} />
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
