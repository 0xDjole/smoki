<script lang="ts">
	let {
		items = $bindable([]),
		itemComponent,
		itemProps,
		notFoundText,
		t,
		height = '100%',
		listStyle = ''
	} = $props();
</script>

<div style={`--height: ${height}; ${listStyle}`} class="basic-list">
	<div class="list">
		{#if !items.length}
			<span class="not-found">{$t(notFoundText)}</span>
		{/if}
		{#each items as item, index}
			{@const SvelteComponent = itemComponent}
			<SvelteComponent {item} {index} {...itemProps} />
		{/each}
	</div>
</div>

<style type="text/postcss">
	.not-found {
		@apply text-lg md:text-xl text-primary font-bold m-2 pt-8;
	}
	.basic-list {
		height: var(--height);
	}
	.list {
		@apply flex flex-wrap w-full justify-center;
	}
</style>
