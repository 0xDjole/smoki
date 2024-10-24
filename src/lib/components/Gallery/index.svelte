<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import { dndzone } from 'svelte-dnd-action';
	import Upload from '../Upload.svelte';
	import Close from '../../utils/icons/close.svg?raw';
	import SvgIcon from '../SvgIcon.svelte';
	import Label from '../Label.svelte';

	let { medias = $bindable([]), label, t } = $props();

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
				} else if (media.settings.position !== -1) {
					media.settings.position += 1; // Increment position for other visible items
				}
				return media;
			});
		} else {
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

<button class="add-new" onclick={preventDefault(addNewGalleryItem)}> Add gallery item </button>

<div
	class="gallery"
	use:dndzone={{ items: medias }}
	onconsider={handleDndConsider}
	onfinalize={handleDndFinalize}
>
	{#each medias as media, index (media.id)}
		<div class="gallery-item">
			<Upload
				{t}
				bind:media={medias[index]}
				showSettings={true}
				onChangeThumbnail={(isThumbnail) => {
					onChangeThumbnail(isThumbnail, index);
				}}
				onChangeShown={(isShown) => {
					onChangeShown(isShown, index);
				}}
			/>

			<button class="remove" onclick={preventDefault(() => removeMedia(index))}>
				<SvgIcon data={Close} width="50px" size="50px" color="white" />
			</button>
		</div>
	{/each}
</div>

<style type="text/postcss">
	.gallery {
		@apply flex flex-wrap;
	}

	.add-new {
		@apply text-primary font-bold text-xl bg-primary border-primary p-5;
	}

	.gallery-item {
		@apply relative m-3 w-[300px] h-[300px];
	}

	.remove {
		@apply bg-error p-1 rounded-md absolute right-12 top-0;
	}
</style>
