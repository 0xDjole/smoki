<script lang="ts">
	import Upload from '../Upload.svelte';
	import Close from '../../utils/icons/close.svg?raw';
	import SvgIcon from '../SvgIcon.svelte';
	import Label from '../Label.svelte';

	export let medias;
	export let label;
	export let t;

	const onChangeThumbnail = (isThumbnail, index) => {
		medias = medias.map((media, mediaIndex) => {
			if (mediaIndex !== index && isThumbnail) {
				console.log('jeb gse', media);
				media.settings.isThumbnail = false;
				return media;
			}

			return media;
		});
	};
</script>

<Label {t} {label} errors={[]} />

<button
	class="add-new"
	on:click|preventDefault={() => {
		medias = [...media, null];
	}}>Add gallery item</button
>

<div class="gallery">
	{#each medias as media, index}
		<div class="gallery-item">
			<Upload
				{t}
				bind:media
				showSettings={true}
				onChangeThumbnail={(isThumbnail) => {
					onChangeThumbnail(isThumbnail, index);
				}}
			/>

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
