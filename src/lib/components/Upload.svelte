<script lang="ts">
	import SvgIcon from './SvgIcon.svelte';
	import UploadSvg from '../utils/icons/upload.svg?raw';
	import Loader from './Loader.svelte';
	import Label from './Label.svelte';
	import linkToFile from '../utils/helpers/linkToFile';
	import { STORAGE_URL } from '../utils/env';

	export let image = null;
	export let label = null;
	export let alt = 'Alt';
	export let t;
	export let isRequired = false;

	let fileInput;
	let avatar;
	let loading = false;

	const generateAvatar = (image) => {
		if (image && (image instanceof File || image instanceof Blob)) {
			const reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = (e) => {
				avatar = e.target.result;
				loading = false;
			};
			reader.onerror = (error) => {
				loading = false;
			};
		}
	};

	const parseImageFromUrl = async (url) => {
		if (url) {
			const fullUrl = `${STORAGE_URL}/${url}`;
			const imageResponse = await linkToFile(fullUrl);

			image = imageResponse;
		}
	};

	$: parseImageFromUrl(image?.url);

	$: generateAvatar(image);

	const onFileSelected = (e) => {
		loading = true;

		const imageFile = e.target.files[0];

		if (!imageFile || !['image/jpg', 'image/jpeg', 'image/png'].includes(imageFile.type)) {
			loading = false;
			return;
		}

		image = imageFile;
	};
</script>

<Label {isRequired} {t} {label} errors={[]} />

<div
	class="avatar-uploader"
	on:click|preventDefault={() => fileInput.click()}
	aria-role="button"
	aria-label="Image uploader"
>
	{#if loading}
		<Loader />
	{:else if avatar}
		<img class="avatar" src={avatar} {alt} />
	{:else}
		<SvgIcon data={UploadSvg} size={'200px'} color={'var(--secondary-text-color)'} />
	{/if}
</div>

<input
	id="image-uploader"
	style="display:none"
	type="file"
	accept=".jpg, .jpeg, .png"
	on:change={onFileSelected}
	bind:this={fileInput}
	aria-label="File input"
/>

<style type="text/postcss">
	.avatar-uploader {
		@apply cursor-pointer;
	}

	.avatar {
		@apply rounded-md;
		display: flex;
		height: 250px;
		width: 250px;
	}
</style>
