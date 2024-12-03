<script lang="ts">
	import BasicList from './BasicList.svelte';
	import InfiniteList from './InfiniteList.svelte';

	let { type = 'infinite', items = $bindable(), ...props } = $props();
</script>

{#if type === 'basic'}
	<BasicList {...props} {items} />
{/if}

{#if type === 'infinite'}
	<InfiniteList {...props} {items} />
{/if}
