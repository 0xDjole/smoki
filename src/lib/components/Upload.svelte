<script lang="ts">
	import SvgIcon from './SvgIcon.svelte';
	import UploadSvg from '../utils/icons/upload.svg?raw';
	import Loader from './Loader.svelte';
	import Label from './Label.svelte';
	import linkToFile from '../utils/helpers/linkToFile';
	import { STORAGE_URL } from '../utils/env';

	export let media = null;
	export let label = null;
	export let alt = 'Alt';
	export let t;
	export let isRequired = false;

	let fileInput;
	let mediaSource;
	let loading = false;
	let isVideo = false;

	const generateMediaPreview = (media) => {
		if (media && (media instanceof File || media instanceof Blob)) {
			const reader = new FileReader();
			reader.readAsDataURL(media);
			reader.onload = (e) => {
				mediaSource = e.target.result;
				loading = false;
				isVideo = media.type.startsWith('video/');
				if (isVideo) {
					createVideoThumbnail(mediaSource);
				}
			};
			reader.onerror = (error) => {
				loading = false;
			};
		}
	};

	const createVideoThumbnail = (source) => {
		const video = document.createElement('video');
		video.src = source;
		video.addEventListener('loadedmetadata', () => {
			// Seek to the first frame or another moment where a frame is guaranteed to be available
			video.currentTime = 0.1; // Change 0.1 to a moment you expect to have a visible frame
		});
		video.addEventListener('seeked', () => {
			// Only draw when the video has been seeked to the desired frame
			const canvas = document.createElement('canvas');
			canvas.width = 250; // Set to video dimensions or desired thumbnail dimensions
			canvas.height = 250;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			mediaSource = canvas.toDataURL('image/png');
		});
		video.load(); // Start loading the video to trigger the events
	};

	const parseImageFromUrl = async (url) => {
		if (url) {
			const fullUrl = `${STORAGE_URL}/${url}`;
			const mediaResponse = await linkToFile(fullUrl);
			media = mediaResponse;
		}
	};

	$: parseImageFromUrl(media?.url);

	$: generateMediaPreview(media);

	const onFileSelected = (e) => {
		loading = true;
		const mediaFile = e.target.files[0];
		if (
			!mediaFile ||
			!['image/jpg', 'image/jpeg', 'image/png', 'video/mp4'].includes(mediaFile.type)
		) {
			loading = false;
			return;
		}
		media = mediaFile;
	};
</script>

<Label {isRequired} {t} {label} errors={[]} />

<div
	class="avatar-uploader"
	on:click|preventDefault={() => fileInput.click()}
	aria-role="button"
	aria-label="Media uploader"
>
	{#if loading}
		<Loader />
	{:else if mediaSource}
		<img class="media" src={mediaSource} {alt} />
	{:else}
		<SvgIcon data={UploadSvg} size={'200px'} color={'var(--secondary-text-color)'} />
	{/if}
</div>

<input
	id="media-uploader"
	style="display:none"
	type="file"
	accept=".jpg, .jpeg, .png, .mp4"
	on:change={onFileSelected}
	bind:this={fileInput}
	aria-label="File input"
/>

<style type="text/postcss">
	.avatar-uploader {
		@apply cursor-pointer;
	}

	.media {
		@apply rounded-md;
		display: flex;
		height: 250px;
		width: 250px;
	}
</style>
