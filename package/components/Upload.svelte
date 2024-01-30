<script>import SvgIcon from '../utils/components/SvgIcon.svelte';
import Upload from '../utils/icons/upload.svg?raw';
import Loader from '../utils/components/Loader.svelte';
export let image = null;
export let label = null;
export let alt = 'Alt';
let fileInput;
let avatar;
let loading = false;
$: if (image) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
        avatar = e.target.result;
        loading = false;
    };
}
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

{#if label}
	<label class="label" for="label">{label}</label>
{/if}

<div
	class="avatar-uploader"
	on:click={() => fileInput.click()}
	aria-role="button"
	aria-label="Image uploader"
>
	{#if loading}
		<Loader />
	{:else if avatar}
		<img class="avatar" src={avatar} {alt} />
	{:else}
		<SvgIcon data={Upload} size={'200px'} fill="white" />
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

<style>
	.label {
		margin-bottom: 0.5rem;
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 700;
		color: var(--primary-text-color)
}

	.avatar-uploader {
		cursor: pointer
}

	.avatar {
		border-radius: 0.375rem;
		display: flex;
		height: 250px;
		width: 250px
}</style>
