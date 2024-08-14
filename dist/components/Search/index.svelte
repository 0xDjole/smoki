<script>import SvgIcon from '../SvgIcon.svelte';
import Search from '../../utils/icons/search.svg?raw';
export let value;
export let placeholder;
export let onSearch = (value) => { };
</script>

<div class="search-name" on:click|preventDefault={() => {}}>
	<div class="search-button">
		<SvgIcon data={Search} color={'text-primary'} />
	</div>

	<input
		on:input={(e) => {
			const value = e.target.value;

			onSearch(value);
		}}
		{placeholder}
		bind:value
		class="search-input"
		type="text"
	/>
</div>

<style>
	.search-name {
		display: flex;
		border-radius: 9999px;
		background-color: var(--secondary-background-color);
		height: 45px;
		width: 100%
}

	.search-button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 0.75rem;
		border-bottom-left-radius: 20px;
		border-top-left-radius: 20px;
		width: 30px
}

	@media (min-width: 768px) {

	.search-button {
			width: 50px
	}
		}

	.search-input {
		flex-grow: 1;
		cursor: pointer;
		background-color: transparent;
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
		padding-left: 0.5rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis
}

	@media (min-width: 768px) {

	.search-input {
				padding-top: 0.5rem;
				padding-bottom: 0.5rem;
				font-size: 1.25rem;
				line-height: 1.75rem
		}
		}</style>
