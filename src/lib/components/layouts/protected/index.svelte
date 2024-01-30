<script>
	import { onMount } from 'svelte';
	import Loader from '$lib/utils/components/Loader.svelte';
	import { navigation } from 'super-navigation';
	import Cookies from 'js-cookie';

	export let accessToken;

	onMount(() => {
		if (!Cookies.get('accessToken')) {
			navigation.navigate(`/login`);
		}
	});
</script>

{#if !accessToken}
	<Loader />
{:else}
	<slot />
{/if}
