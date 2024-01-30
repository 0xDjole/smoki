<script lang="ts">
	import Close from '$lib/utils/icons/close.svg?raw';
	import SvgIcon from '$lib/utils/components/SvgIcon.svelte';

	export let onClick = () => {};
</script>

<span class="remove" on:click={onClick}>
	<SvgIcon data={Close} size={'30px'} color={'white'} />
</span>

<style type="text/postcss">
	.remove {
		@apply grid items-center cursor-pointer;
	}
</style>
