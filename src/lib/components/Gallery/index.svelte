<script lang="ts">
	import Upload from '../Upload.svelte';
	import Close from '../../utils/icons/close.svg?raw';
	import SvgIcon from '../SvgIcon.svelte';
	import Label from '../Label.svelte';

	export let files;
	export let label;
	export let t;
</script>

<Label {t} {label} errors={[]} />

<button
	class="add-new"
	on:click|preventDefault={() => {
		files = [...files, null];
	}}>Add gallery item</button
>

<div class="gallery">
	{#each files as file}
		<div class="gallery-item">
			<Upload {t} bind:file />

			<button class="remove"
				><SvgIcon data={Close} width={'50px'} size={'50px'} color={'white'} /></button
			>
		</div>
	{/each}
</div>

<style type="text/postcss">
	.gallery {
		@apply flex flex-wrap;
	}

	.add-new {
		@apply text-primary font-bold text-xl bg-primary border-primary   p-5;
	}

	.gallery-item {
		@apply relative m-3 w-[300px] h-[300px];
	}
	.remove {
		@apply bg-error p-1 rounded-md absolute right-12 top-0;
	}
</style>
