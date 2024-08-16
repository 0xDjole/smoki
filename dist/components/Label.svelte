<script>import { STORAGE_URL } from '../utils/env';
export let label = '';
export let labelThumbnail = null;
export let isRequired;
export let errors = [];
export let t;
export let size = 'sm';
let avatar = null;
let loading = true;
const parseImageFromUrl = async (url) => {
    if (url) {
        const fullUrl = `${STORAGE_URL}/${url}`;
        avatar = fullUrl;
        loading = false;
    }
};
$: parseImageFromUrl(labelThumbnail?.url);
$: if (labelThumbnail && (labelThumbnail instanceof File || labelThumbnail instanceof Blob)) {
    const reader = new FileReader();
    reader.readAsDataURL(labelThumbnail);
    reader.onload = (e) => {
        avatar = e.target.result;
        loading = false;
    };
    reader.onerror = (error) => {
        console.error('Error reading file:', error);
    };
}
</script>

{#if label}
	<div class="thumbnail-wrapper">
		{#if !loading}
			<div class="thumbnail" class:sm={size === 'sm'} class:md={size === 'md'}>
				<img class="image" alt="Label" src={avatar} />
			</div>
		{/if}

		<div class:label-error={errors.length} for={label} class="label">{t ? $t(label) : label}</div>
		{#if isRequired}
			<span class="required">*</span>
		{/if}
	</div>
{/if}

<style>
	.required {
		position: relative;
		display: inline-block;
		vertical-align: top;
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 700;
		color: var(--error-background-color);
}

	.thumbnail-wrapper {
		display: flex;
		align-items: flex-end;
		-moz-column-gap: 0.5rem;
		     column-gap: 0.5rem;
}

	.label {
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 700;
		color: var(--primary-text-color);
}

	@media (min-width: 768px) {

		.label {
				font-size: 1.25rem;
				line-height: 1.75rem;
		}
}

	.thumbnail-container {
		display: flex;
		align-items: flex-end;
}

	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25%,
		75% {
			transform: translateX(-5px);
		}
		50% {
			transform: translateX(5px);
		}
	}

	.label-error {
		color: var(--error-background-color);
		animation: shake 0.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		perspective: 1000px;
}

	.image {
		height: 100%;
		width: 100%;
}

	.md {
		height: 3rem;
		width: 3rem;
}

	@media (min-width: 640px) {

		.md {
				height: 4rem;
				width: 4rem;
		}
}

	.sm {
		height: 2rem;
		width: 2rem;
}

	@media (min-width: 640px) {

		.sm {
				height: 2.25rem;
				width: 2.25rem;
		}
}

	.thumbnail {
		border-radius: 9999px;
}</style>
