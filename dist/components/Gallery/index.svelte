<script>import Upload from '../Upload.svelte';
import Close from '../../utils/icons/close.svg?raw';
import SvgIcon from '../SvgIcon.svelte';
import Label from '../Label.svelte';
export let images;
export let label;
export let t;
</script>

<Label {t} {label} errors={[]} />

<button
	class="add-new"
	on:click|preventDefault={() => {
		images = [...images, null];
	}}>Add gallery item</button
>

<div class="gallery">
	{#each images as image}
		<div class="gallery-item">
			<Upload {t} bind:image />

			<button class="remove"
				><SvgIcon data={Close} width={'50px'} size={'50px'} color={'white'} /></button
			>
		</div>
	{/each}
</div>

<style>
	.gallery {

    display: flex;

    flex-wrap: wrap
}

	.add-new {

    background-color: var(--primary-background-color);

    padding: 1.25rem;

    font-size: 1.25rem;

    line-height: 1.75rem;

    font-weight: 700;

    color: var(--primary-text-color);

    border-color: var(--primary-border-color);

    border-width: 1px;

    border-style: solid
}

	.gallery-item {

    position: relative;

    margin: 0.75rem;

    height: 300px;

    width: 300px
}

	.remove {

    position: absolute;

    right: 3rem;

    top: 0px;

    border-radius: 0.375rem;

    background-color: var(--error-background-color);

    padding: 0.25rem
}</style>
