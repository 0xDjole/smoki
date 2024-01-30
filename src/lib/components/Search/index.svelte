<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SvgIcon from '../SvgIcon.svelte';

	import Search from '../../utils/icons/search.svg?raw';
	import SearchSuggestion from './SearchSuggestion/index.svelte';

	export let value;

	export let suggestionOpened = false;
	export let suggestionItems = [];

	export let onSearch = () => {};

	const dispatch = createEventDispatcher();
	export let onClickItem = () => {};
</script>

<div class="search-name">
	<div class="search-button">
		<div class="search-button2">
			<SvgIcon data={Search} width={'25px'} size={'25px'} color={'white'} />
		</div>
	</div>

	<div class="search-input" style="" type="text" kind="primary">
		<input
			on:input={(e) => {
				const value = e.target.value;

				dispatch('searching', { value });
			}}
			class="input"
			placeholder="Try anything here"
			{value}
			style="background: transparent; outline: none"
			type="text"
		/>
		<div class="confirm-search">
			<div
				on:click={() => {
					dispatch('search');
				}}
				class="confirm-search-button"
			>
				Search
			</div>
		</div>
	</div>
	<SearchSuggestion
		on:itemClick={(input) => {
			value = input.detail.item.name;
			suggestionOpened = false;
		}}
		title="AI suggestions"
		opened={suggestionOpened}
		items={suggestionItems}
	/>
</div>

<style type="text/postcss">
	.search-name {
		@apply flex m-10 mb-5 relative;
		height: 45px;

		@screen md {
			width: 800px;
		}
	}

	.search-button {
		@apply relative;
	}

	.confirm-search {
		@apply absolute bg-primary rounded-md;
		width: 100px;
		right: 5px;
		bottom: 5px;
	}

	.confirm-search-button {
		@apply px-3 text-primary font-bold text-2xl;
		width: 100%;
		height: 100%;
		margin: 0px;
	}

	.search-button2 {
		@apply grid bg-secondary items-center px-3;
		border-bottom-left-radius: 20px;
		border-top-left-radius: 20px;
		width: 100%;
		height: 100%;
		margin: 0px;
	}

	.search-input {
		@apply relative bg-secondary text-primary font-semibold text-base outline-none text-opacity-80 cursor-pointer pr-4 pt-1;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;

		flex-grow: 1;
		@screen md {
			@apply text-xl pt-0;
		}
	}
	.input {
		@apply w-full h-full;
	}
</style>
