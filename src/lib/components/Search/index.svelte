<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import SvgIcon from '../SvgIcon.svelte';
	import Search from '../../utils/icons/search.svg?raw';

	let { value = $bindable(), placeholder, onSearch = (value) => {} } = $props();
</script>

<div class="search-name" onclick={preventDefault(() => {})}>
	<div class="search-button">
		<SvgIcon data={Search} color={'text-primary'} />
	</div>

	<input
		oninput={(e) => {
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
