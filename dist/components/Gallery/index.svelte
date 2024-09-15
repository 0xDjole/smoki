<script>import { dndzone } from 'svelte-dnd-action';
import Upload from '../Upload.svelte';
import Close from '../../utils/icons/close.svg?raw';
import SvgIcon from '../SvgIcon.svelte';
import Label from '../Label.svelte';
export let medias = [];
export let label;
export let t;
const onChangeThumbnail = (isThumbnail, index) => {
    medias = medias.map((media, mediaIndex) => {
        if (mediaIndex !== index && isThumbnail) {
            media.settings.isThumbnail = false;
        }
        return media;
    });
};
const updatePositions = () => {
    let positionCounter = 1;
    medias = medias
        .map((media) => {
        if (media.settings.position !== -1) {
            return { ...media, settings: { ...media.settings, position: positionCounter++ } };
        }
        return media;
    })
        .sort((a, b) => a.settings.position - b.settings.position); // Sort by position
};
const handleDndConsider = (e) => {
    medias = e.detail.items.slice(); // Ensure new reference to trigger reactivity
};
const handleDndFinalize = (e) => {
    medias = e.detail.items.slice(); // Ensure reactivity by creating a new reference
    updatePositions(); // Update the positions after finalizing the drag
};
const addNewGalleryItem = () => {
    medias = [
        ...medias,
        {
            id: Math.random().toString(),
            settings: { isThumbnail: false, position: medias.length + 1, isShown: true } // Add new item with next position
        }
    ];
};
const removeMedia = (index) => {
    medias = medias.filter((_, i) => i !== index);
    updatePositions(); // Update positions after removing an item
};
const onChangeShown = (isShown, index) => {
    if (isShown) {
        medias = medias.map((media, mediaIndex) => {
            if (mediaIndex === index) {
                media.settings.position = 0;
            }
            else if (media.settings.position !== -1) {
                media.settings.position += 1; // Increment position for other visible items
            }
            return media;
        });
    }
    else {
        medias = medias.map((media, mediaIndex) => {
            if (mediaIndex === index) {
                media.settings.position = -1;
            }
            return media;
        });
    }
    // Sort and update positions of remaining visible items
    updatePositions();
};
</script>

<Label {t} {label} errors={[]} />

<button class="add-new" on:click|preventDefault={addNewGalleryItem}> Add gallery item </button>

<div
	class="gallery"
	use:dndzone={{ items: medias }}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
>
	{#each medias as media, index (media.id)}
		<div class="gallery-item">
			<Upload
				{t}
				bind:media
				showSettings={true}
				onChangeThumbnail={(isThumbnail) => {
					onChangeThumbnail(isThumbnail, index);
				}}
				onChangeShown={(isShown) => {
					onChangeShown(isShown, index);
				}}
			/>

			<button class="remove" on:click|preventDefault={() => removeMedia(index)}>
				<SvgIcon data={Close} width="50px" size="50px" color="white" />
			</button>
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
