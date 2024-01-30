<script>
	import NavigationBarTab from './NavigationBarTab.svelte';
	export let tabs = [];
	export let navbar;
	export let handleClick;
	export let activeTabIndex;
	let columns = tabs.reduce((aggr) => aggr.concat('1fr '), '');
</script>

<ul style={`grid-template-columns: ${columns}`} class="navigation-bar">
	{#each tabs as tab, i}
		<NavigationBarTab
			{handleClick}
			{navbar}
			{tab}
			isActive={activeTabIndex === i}
			{i}
			tabLength={tabs.length}
		/>
	{/each}
</ul>

<style>
	.navigation-bar {
    display: grid;
    width: 100%;
    list-style-type: none;
    align-self: flex-end;
    font-size: 1.125rem;
    line-height: 1.75rem
}</style>
