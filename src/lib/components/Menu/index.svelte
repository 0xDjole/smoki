<script lang="ts">
	let { items } = $props();
</script>

<div class="menu">
	{#each items as item}
		<button
			class="menu-item"
			on:click={() => {
				item.onClick();
			}}
		>
			{item.label}
		</button>
	{/each}
</div>

<style type="text/postcss">
	.menu {
		@apply min-w-[200px] bg-white border border-gray-200 
               rounded-lg shadow-lg z-50;
	}

	.menu-item {
		@apply w-full text-left px-4 py-2 bg-transparent border-none cursor-pointer
               text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 
               first:rounded-t-lg last:rounded-b-lg;
	}

	.menu-item:not(:last-child) {
		@apply border-b border-gray-200;
	}
</style>
