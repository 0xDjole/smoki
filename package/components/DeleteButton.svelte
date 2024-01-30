<script>import Close from './icons/close.svg?raw';
import SvgIcon from './SvgIcon.svelte';
export let onClick = () => { };
</script>

<span class="remove" on:click={onClick}>
	<SvgIcon data={Close} size={'30px'} color={'white'} />
</span>

<style>
	.remove {
    display: grid;
    cursor: pointer;
    align-items: center
}</style>
