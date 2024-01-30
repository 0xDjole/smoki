<script>import { createEventDispatcher } from 'svelte';
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

<style>
	.wrapper {
		position: absolute;
		width: 100%;
		border-radius: 0.375rem;
		background-color: var(--primary-background-color);
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 700;
		color: var(--primary-text-color);
		border-color: var(--primary-border-color);
		border-width: 1px;
		border-style: solid;
		top: 60px;
		z-index: 10
}

	.title {
		border-bottom-width: 2px;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		padding-left: 0.5rem;
		font-size: 1.5rem;
		line-height: 2rem;
		border-color: var(--primary-border-color);
		border-width: 1px;
		border-style: solid
}

	.items {
		display: grid
}

	.item {
		cursor: pointer;
		padding: 0.5rem
}

	.item:hover {
		background-color: var(--secondary-background-color)
}</style>
