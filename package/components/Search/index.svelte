<script>import { createEventDispatcher } from 'svelte';
import SvgIcon from '../SvgIcon.svelte';
import Search from '../../utils/icons/search.svg?raw';
import SearchSuggestion from './SearchSuggestion/index.svelte';
export let value;
export let suggestionOpened = false;
export let suggestionItems = [];
export let onSearch = () => { };
const dispatch = createEventDispatcher();
export let onClickItem = () => { };
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

<style>
	.search-name {
		position: relative;
		margin: 2.5rem;
		margin-bottom: 1.25rem;
		display: flex;
		height: 45px
}

		@media (min-width: 768px) {
	.search-name {
			width: 800px
	}
		}

	.search-button {
		position: relative
}

	.confirm-search {
		position: absolute;
		border-radius: 0.375rem;
		background-color: var(--primary-background-color);
		width: 100px;
		right: 5px;
		bottom: 5px
}

	.confirm-search-button {
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 700;
		color: var(--primary-text-color);
		width: 100%;
		height: 100%;
		margin: 0px
}

	.search-button2 {
		display: grid;
		align-items: center;
		background-color: var(--secondary-background-color);
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		border-bottom-left-radius: 20px;
		border-top-left-radius: 20px;
		width: 100%;
		height: 100%;
		margin: 0px
}

	.search-input {
		position: relative;
		cursor: pointer;
		background-color: var(--secondary-background-color);
		padding-right: 1rem;
		padding-top: 0.25rem;
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 600;
		color: var(--primary-text-color);
		--tw-text-opacity: 0.8;
		outline: 2px solid transparent;
		outline-offset: 2px;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;

		flex-grow: 1
}

	@media (min-width: 768px) {

	.search-input {
				padding-top: 0px;
				font-size: 1.25rem;
				line-height: 1.75rem
		}
		}

	.input {
		height: 100%;
		width: 100%
}</style>
