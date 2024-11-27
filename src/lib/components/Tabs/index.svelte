<script lang="ts">
	interface Tab {
		id: string;
		label: string;
		component: import('svelte').Snippet;
	}

	interface Props {
		tabs: Tab[];
		activeId?: string;
	}

	let { tabs = [], activeId, ...slotProps }: Props = $props();
	let currentTab = $state(activeId || tabs[0]?.id);

	$effect(() => {
		if (activeId) {
			currentTab = activeId;
		}
	});
</script>

<div class="tabs-container">
	<div class="tab-list">
		{#each tabs as tab}
			<button
				class="tab-button"
				class:active={currentTab === tab.id}
				on:click={() => (currentTab = tab.id)}
			>
				{tab.label}
			</button>
		{/each}
	</div>

	<div class="tab-content">
		{#each tabs as tab}
			{#if currentTab === tab.id}
				{@const slotProp = slotProps[tab.id]}
				{@render slotProp(tab)}
			{/if}
		{/each}
	</div>
</div>

<style type="text/postcss">
	.tab-content {
		@apply flex-1;
	}

	.tabs-container {
		@apply flex flex-col w-full border border-gray-200 rounded-lg h-full;
	}

	.tab-list {
		@apply flex border-b border-gray-200;
	}

	.tab-button {
		@apply px-4 py-2 text-sm font-medium transition-colors duration-150
           text-gray-500 hover:text-gray-700 border-b-2 border-transparent
           first:rounded-tl-lg;
	}

	.tab-button.active {
		@apply text-blue-600 border-b-2 border-blue-600 bg-white;
	}

	.tab-panel {
		@apply duration-200;
	}
</style>
