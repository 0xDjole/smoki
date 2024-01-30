<script>import { navigation } from '../../store';
import Header from '../Header/index.svelte';
export let title;
export let showBack;
export let navigationPath;
export let showHeader = true;
export let headerClass;
$: hasTab =
    navigationPath && navigationPath.length
        ? navigationPath.some((path) => path.navigationType === 'Tab')
        : false;
</script>

{#if showHeader}
	<Header {headerClass}>
		<div slot="left">
			{#if showBack}
				<div
					class="back"
					on:click={async () => {
						navigation.back();
					}}
				>
					<slot name="back" />
				</div>
			{/if}
		</div>
		<div slot="middle">
			<span class="title">
				{title}
			</span>
		</div>
		<div slot="right" />
	</Header>
{/if}

{#if hasTab}
	<div class:show-header={showHeader} class:not-show-header={!showHeader} class="wrap">
		<div class="wrap-scroll">
			<slot />
		</div>
	</div>
{:else}
	<slot />
{/if}

<style>
	.wrap-scroll {
		height: 100%;
		width: 100%;
		overflow-y: scroll;
}

	.wrap-scroll::-webkit-scrollbar {
		width: 0px;
		background: transparent;
	}

	.show-header {
		height: calc(100vh - 60px - 55px);
	}

	@media (min-width: 768px) {

	.show-header {
			height: calc(100vh - 80px - 55px)
	}
		}

	.not-show-header {
		height: calc(100vh - 55px);
	}

	.title {
		white-space: nowrap;
}

	.wrap {
		margin-left: auto;
		margin-right: auto;
		width: 100vw;
		overflow: hidden;
		grid-template-columns: 1fr;
}

	.back {
		display: grid;
		height: 3.5rem;
		width: 3.5rem;
		cursor: pointer;
		align-items: center;
		justify-content: center;
}</style>
