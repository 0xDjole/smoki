<script lang="ts">
	import { Screen, NavigationBar } from 'super-navigation';

	import Home from '$lib/screens/Home/index.svelte';
	import User from '$lib/screens/User/index.svelte';
	import Reservations from '$lib/screens/Reservations/index.svelte';

	import UserIcon from '$lib/utils/icons/user.svg?raw';
	import BellIcon from '$lib/utils/icons/bell.svg?raw';
	import HomeIcon from '$lib/utils/icons/home.svg?raw';

	export let showBack: boolean;
	export let title: string;
	export let showNavbar: boolean = true;
	export let showHeader: boolean = true;
	export let showList: boolean = false;

	let config;
	let navbar;
	let screens;

	if (showNavbar) {
		config = {
			defaultTab: '/',
			navbar: {
				background: {
					color: '#15202b',
					colorActive: '#212121'
				},
				delimiter: { color: '#8c8c8c', width: 2 },
				borderTop: { color: '#8c8c8c', colorActive: 'orange', width: 2 },
				text: {
					color: '#5e5e5e',
					colorActive: 'white',
					fontFamily: `'Lato', sans-serif`
				}
			}
		};

		navbar = config.navbar;

		screens = [
			{
				component: User,
				title: 'User Profile',
				isProtected: true,
				path: '/user',
				icon: {
					type: 'svg',
					data: UserIcon
				}
			},
			{
				component: Home,
				title: 'Home',
				isProtected: true,
				path: '/',
				icon: { type: 'svg', data: HomeIcon }
			},
			{
				component: Reservations,
				title: 'Reservations',
				isProtected: true,
				path: '/reservations',
				icon: { type: 'svg', data: BellIcon }
			}
		];
	}
</script>

<Screen
	headerClass="bg-primary border-underline"
	{showHeader}
	{showBack}
	{title}
	navigationPath={[]}
>
	<slot />

	{#if showList}
		<ul class="list">
			{#each new Array(20).fill(0) as item}
				<div class="list-item-wrap">
					<div class="list-item">
						<div class="flex flex-col flex-1 gap-5 sm:p-2">
							<div class="flex flex-1 flex-col gap-7">
								<div class="bg-gray-700 w-full animate-pulse h-10 rounded-2xl" />
								<div class="bg-gray-700 w-full animate-pulse h-6 rounded-2xl" />
								<div class="bg-gray-700 w-full animate-pulse h-6 rounded-2xl" />
								<div class="bg-gray-700 w-full animate-pulse h-6 rounded-2xl" />
								<div class="bg-gray-700 w-full animate-pulse h-6 rounded-2xl" />
							</div>
						</div>
					</div>
				</div>
			{/each}
		</ul>
	{/if}

	{#if showNavbar}
		<div class="navigation-bar-wrapper">
			<NavigationBar {navbar} tabs={screens} handleClick={() => {}} activeTabIndex={1} />
		</div>
	{/if}
</Screen>

<style type="text/postcss">
	.navigation-bar-wrapper {
		position: fixed;
		z-index: 100;
		width: 100%;
		bottom: 0;
	}

	.list {
		@apply grid w-full gap-5 justify-items-center bg-primary;
		padding-top: 45px;
		width: 100%;
		grid-auto-rows: 300px;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}

	.list-item-wrap {
		width: 95%;
	}

	.list-item {
		@apply grid bg-primary   border-secondary rounded-xl text-primary font-bold cursor-default cursor-pointer transition-transform hover:border-success h-full w-full;
		grid-auto-rows: 3fr 1fr;
		box-sizing: border-box;
	}
</style>
