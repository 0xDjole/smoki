<script lang="ts">
	import Plus from '../../utils/icons/plus.svg?raw';
	import Close from '../../utils/icons/close.svg?raw';
	import Less from '../../utils/icons/less.svg?raw';
	import User from '../../utils/icons/user.svg?raw';
	import Search from '../../utils/icons/search.svg?raw';
	import Success from '../../utils/icons/checkmark.svg?raw';
	import Preview from '../../utils/icons/preview.svg?raw';
	import SvgIcon from '../SvgIcon.svelte';

	export let svgName = '';
	export let position = '';
	export let size = 'small';

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

		if (svgName === 'close') {
			return Close;
		}

		if (svgName === 'success') {
			return Success;
		}

		if (svgName === 'preview') {
			return Preview;
		}
	};

	const parseSize = (size) => {
		if (size === 'large') {
			return '100px';
		}

		if (size === 'medium') {
			return '50px';
		}

		return '30px';
	};
</script>

<span class={`remove ${parsePosition(position)}`} on:click|preventDefault={onClick}>
	<SvgIcon data={parseSvgName(svgName)} size={parseSize(size)} color={'white'} />
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
