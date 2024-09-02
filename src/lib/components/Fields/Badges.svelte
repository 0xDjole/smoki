<script lang="ts">
	import Label from '../Label.svelte';
	import Viber from '../../utils/icons/viber.svg?raw';
	import PhoneNumber from '../../utils/icons/phone_number.svg?raw';
	import WhatsApp from '../../utils/icons/whatsapp.svg?raw';
	import Share from '../../utils/icons/share.svg?raw';
	import Modal from '../Modal/index.svelte';
	import Loader from '../Loader.svelte';
	import SvgIcon from '../SvgIcon.svelte';

	export let fields = [];
	export let fieldConfigs = [];
	export let locale = 'en';
	export let label = null;
	export let t;
	export let shareData = {
		title: '',
		text: '',
		url: ''
	};

	$: badgeDetails = fieldConfigs
		.filter((fieldConfig) => fieldConfig.type === 'badge')
		.map((fieldConfig) => ({
			fieldConfig,
			field: fields.find((field) => fieldConfig.id === field.fieldConfigId)
		}));

	let showModal = false;
	let loading = false;

	function cleanNumber(number: string): string {
		return number.replace(/[^0-9+]/g, '');
	}

	const handleNavigation = async (app: string, number: string) => {
		if (
			['viber', 'whatsapp', 'phone_number'].includes(app) &&
			!window.navigator.userAgent.includes('Mobi')
		) {
			showModal = true;
		} else {
			loading = true;
			const cleanedNumber = cleanNumber(number);
			const noPlusNumber = cleanedNumber.startsWith('+')
				? cleanedNumber.substring(1)
				: cleanedNumber;

			let url = '';
			switch (app) {
				case 'viber':
					url = `viber://chat?number=${noPlusNumber}`;
					break;
				case 'whatsapp':
					url = `https://wa.me/${noPlusNumber}`;
					break;
				case 'phone_number':
					url = `tel:${cleanedNumber}`;
					break;
			}
			window.location.href = url;
			await new Promise((resolve) => setTimeout(resolve, 3000));
			loading = false;
		}
	};

	function share() {
		if (navigator.share) {
			navigator.share({
				title: shareData.title,
				text: shareData.text,
				url: shareData.url
			});
		} else {
			showModal = true;
		}
	}

	let copySuccessIndex: number | null = null;

	async function copyToClipboard(text: string, index: number) {
		try {
			await navigator.clipboard.writeText(text);
			copySuccessIndex = index;
			setTimeout(() => {
				copySuccessIndex = null;
			}, 2000);
		} catch (err) {
			copySuccessIndex = null;
		}
	}
</script>

{#if label}
	<div class="mb-5">
		<Label {t} {label} />
	</div>
{/if}

<div class="custom-field-body">
	<div
		on:click={() => {
			share();
		}}
		class="badge-row"
	>
		<div class="thumbnail">
			<SvgIcon data={Share} size={'30px'} color={'var(--secondary-text-color)'} />
		</div>
	</div>

	<div class="badges">
		{#each badgeDetails as { field, fieldConfig }, index}
			{#if fieldConfig}
				<div
					on:click={() => {
						handleNavigation(field.value.name, field.value.url);
					}}
					class="badge-row"
				>
					<div class="thumbnail">
						{#if field.value.name === 'viber'}
							<SvgIcon data={Viber} size={'30px'} color={'var(--secondary-text-color)'} />
						{/if}

						{#if field.value.name === 'whatsapp'}
							<SvgIcon data={WhatsApp} size={'30px'} color={'var(--secondary-text-color)'} />
						{/if}

						{#if field.value.name === 'phone_number'}
							<SvgIcon data={PhoneNumber} size={'30px'} color={'var(--secondary-text-color)'} />
						{/if}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

{#if loading}
	<div class="loader">
		<Loader />
	</div>
{/if}

<Modal
	title={shareData.text}
	bind:showModal
	modalStyle="width: 95%; max-width: 600px; min-height: 400px; max-height: 500px;"
	onCancel={() => {
		showModal = false;
	}}
>
	<div class="modal-wrapper">
		<div
			on:click={(event) => {
				event.stopPropagation();
				copyToClipboard(shareData.url, 0);
			}}
			class="badge-item"
		>
			<div class="badge">
				<div class="thumbnail">
					<SvgIcon data={Share} size={'30px'} color={'var(--secondary-text-color)'} />
				</div>
				<span class="url-text">
					{shareData.url}
				</span>

				<span class="copy">{$t('copy')}</span>

				<span class:show={copySuccessIndex === 0} class="copy-feedback show">{$t('copied')}</span>
			</div>
		</div>
		{#each badgeDetails as { field, fieldConfig }, index}
			{#if fieldConfig}
				<div
					on:click={(event) => {
						event.stopPropagation();
						copyToClipboard(field.value.url, index + 1);
					}}
					class="badge-item"
				>
					<div class="badge">
						<div class="thumbnail">
							{#if field.value.name === 'viber'}
								<SvgIcon data={Viber} size={'30px'} color={'var(--secondary-text-color)'} />
							{/if}

							{#if field.value.name === 'whatsapp'}
								<SvgIcon data={WhatsApp} size={'30px'} color={'var(--secondary-text-color)'} />
							{/if}

							{#if field.value.name === 'phone_number'}
								<SvgIcon data={PhoneNumber} size={'30px'} color={'var(--secondary-text-color)'} />
							{/if}
						</div>
						<span class="url-text">
							{field.value.url}
						</span>

						<span class="copy">{$t('copy')}</span>

						<span class:show={copySuccessIndex === index + 1} class="copy-feedback show"
							>{$t('copied')}</span
						>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</Modal>

<style type="text/postcss">
	.loader {
		@apply fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-50 bg-black;
	}

	.badges {
		@apply flex items-center gap-x-2;
	}

	.badge-row {
		@apply flex justify-center items-center bg-primary border-primary rounded-full p-1 cursor-pointer;
	}
	.url-text {
		@apply flex-1 text-nowrap text-ellipsis overflow-hidden;
	}
	.copy {
		@apply text-secondary pr-2;
	}

	.badge-item {
		@apply flex bg-primary border-primary rounded-full p-1 font-bold cursor-pointer;
	}

	.badge {
		@apply relative  w-full md:px-[15%] flex gap-x-3 justify-between items-center;
	}

	.custom-field-body {
		@apply flex justify-between items-center rounded-md h-full w-full gap-x-2 px-2;
	}

	.modal-wrapper {
		@apply flex w-[95%] mx-auto flex-col gap-y-2 mt-5;
	}

	.thumbnail {
		@apply bg-white rounded-full p-0.5;
	}

	.copy-feedback {
		@apply absolute text-white bg-success border-primary rounded-full p-1 text-sm font-bold z-10 right-0 -top-3;
		transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
		transform: translateY(-10px);
		opacity: 0;
	}
	.copy-feedback.show {
		transform: translateY(0);
		opacity: 1;
	}
</style>
