<script lang="ts">
	import SvgIcon from '../SvgIcon.svelte';
	import Search from '../../utils/icons/search.svg?raw';

	export let value;
	export let placeholder;
	export let onSearch = (value) => {};
</script>

<div class="search-name" on:click|preventDefault={() => {}}>
	<div class="search-button">
		<SvgIcon data={Search} color={'white'} />
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

<style type="text/postcss">
	.search-name {
		@apply flex bg-secondary rounded-full;
		height: 45px;
		width: 100%;
	}

	.search-button {
		@apply flex items-center justify-center pl-3;
		border-bottom-left-radius: 20px;
		border-top-left-radius: 20px;
		width: 30px;
		@screen md {
			width: 50px;
		}
	}

	.search-input {
		@apply flex-grow bg-transparent text-primary font-semibold text-base outline-none text-opacity-80 cursor-pointer;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
		padding-left: 0.5rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		@screen md {
			@apply text-xl py-2;
		}
	}
</style>
