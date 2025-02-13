<script lang="ts">
	import { run } from 'svelte/legacy';

	import Thumbnail from './Thumbnail/index.svelte';
	import SvgIcon from './SvgIcon.svelte';

	import UploadSvg from '../utils/icons/upload.svg?raw';
	import linkToFile from '../utils/helpers/linkToFile';
	import { STORAGE_URL } from '../utils/env';
	interface Props {
		label?: string;
		labelThumbnail?: any;
		isRequired: any;
		errors?: any;
		t: any;
		size?: string;
	}

	let {
		label = '',
		labelThumbnail = null,
		isRequired,
		errors = $bindable([]),
		t,
		size = 'sm'
	}: Props = $props();

	let avatar = $state(null);
	let loading = $state(true);

	const parseImageFromUrl = async (url) => {
		if (url) {
			const fullUrl = `${STORAGE_URL}/${url}`;
			avatar = fullUrl;
			loading = false;
		}
	};

	run(() => {
		parseImageFromUrl(labelThumbnail?.url);
	});

	run(() => {
		if (labelThumbnail && (labelThumbnail instanceof File || labelThumbnail instanceof Blob)) {
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
	});
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

<style type="text/postcss">
	.required {
		@apply text-xl font-bold text-error relative align-top inline-block;
	}

	.thumbnail-wrapper {
		@apply flex items-end gap-x-2 mb-1.5;
	}

	.label {
		@apply text-lg text-primary font-bold md:text-xl;
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
		@apply text-error;
		animation: shake 0.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		perspective: 1000px;
	}

	.image {
		@apply h-full w-full;
	}

	.md {
		@apply w-12 h-12 sm:w-16 sm:h-16;
	}

	.sm {
		@apply w-8 h-8 sm:w-9 sm:h-9;
	}

	.thumbnail {
		@apply rounded-full overflow-hidden;
	}
</style>
