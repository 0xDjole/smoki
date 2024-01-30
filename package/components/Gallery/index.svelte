<script>import Upload from '../../utils/components/Upload.svelte';
import Close from '../../utils/icons/close.svg?raw';
import SvgIcon from '../../utils/components/SvgIcon.svelte';
export let images;
export let label;
</script>

{#if label}
	<label class="label" for="label">{label}</label>
{/if}

<button
	class="add-new"
	on:click={() => {
		images = [...images, null];
	}}>Add gallery item</button
>

<div class="gallery">
	{#each images as image}
		<div class="gallery-item">
			<Upload bind:image />

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
	.label {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    color: var(--primary-text-color)
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
