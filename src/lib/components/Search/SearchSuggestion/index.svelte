<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let items;
	export let title;
	export let opened;

	const dispatch = createEventDispatcher();
</script>

{#if opened}
	<div class="wrapper">
		<div class="title">{title}</div>

		<ul class="items">
			{#each items as item, index}
				<li
					on:click={() => {
						dispatch('itemClick', {
							item,
							index
						});
					}}
					class="item"
				>
					{item.name}
				</li>
			{/each}
		</ul>
	</div>
{/if}

<style type="text/postcss">
	.wrapper {
		@apply absolute w-full   border-secondary rounded-md bg-primary text-primary text-xl font-bold;
		top: 60px;
		z-index: 10;
	}

	.title {
		@apply text-2xl pl-2  border-b-2 border-secondary py-1;
	}
	.items {
		@apply grid;
	}
	.item {
		@apply p-2 hover:bg-secondary cursor-pointer;
	}
</style>
