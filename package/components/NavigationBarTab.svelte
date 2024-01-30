<script>
	import SvgIcon from './SvgIcon.svelte';
	export let tab = {};
	export let tabLength = 0;
	export let i;
	export let handleClick;
	export let navbar = {};
	export let isActive = false;

	$: fontFamily = navbar.text.fontFamily;

	$: borderTop = `${navbar.borderTop.width}px solid ${
		tab.isActive ? navbar.borderTop.colorActive : navbar.borderTop.color
	}`;

	$: backgroundColor = tab.isActive ? navbar.background.colorActive : navbar.background.color;
	$: color = isActive ? navbar.text.colorActive : navbar.text.color;
</script>

<li
	style={`border-top: ${borderTop}; background-color: ${backgroundColor}; color: ${color}; font-family: ${fontFamily};
`}
	class="navigation-bar-tab"
	on:click={() => handleClick(tab.path)}
>
	<div style="padding-top: 4px">
		<SvgIcon fill={isActive ? 'orange' : 'white'} data={tab.icon.data} class="self-end" />
	</div>
</li>

<style>
	.navigation-bar-tab {
		position: relative;
		display: grid;
		cursor: pointer;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		justify-items: center;
		-moz-column-gap: 1.25rem;
		     column-gap: 1.25rem;
		padding-top: 0.5rem;
		font-weight: 700;
		height: 55px
}</style>
