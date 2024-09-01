<script lang="ts">
	import Label from '../Label.svelte';
	import Viber from '../../utils/icons/viber.svg?raw';
	import PhoneNumber from '../../utils/icons/phone_number.svg?raw';
	import WhatsApp from '../../utils/icons/whatsapp.svg?raw';
	import Share from '../../utils/icons/share.svg?raw';
	import Modal from '../Modal/index.svelte';
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

	function cleanNumber(number: string): string {
		return number.replace(/[^0-9+]/g, '');
	}

	function handleNavigation(app: string, number: string) {
		if (
			['viber', 'whatsapp', 'phone_number'].includes(app) &&
			!window.navigator.userAgent.includes('Mobi')
		) {
			showModal = true;
		} else {
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
		}
	}

	function share() {
		if (navigator.share) {
			navigator
				.share({
					title: shareData.title,
					text: shareData.text,
					url: shareData.url
				})
				.catch(() => {
					showModal = true;
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
			console.log('copySuccessIndex', copySuccessIndex);
			setTimeout(() => {
				copySuccessIndex = null;
			}, 2000); // Reset copySuccessIndex after 2 seconds
		} catch (err) {
			console.error('Failed to copy: ', err);
			copySuccessIndex = null;
		}
	}
</script>

{#if label}
	<div class="mb-5">
		<Label {t} {label} />
	</div>
{/if}

<ul class="custom-field-body">
	{#each badgeDetails as { field, fieldConfig }, index}
		{#if fieldConfig}
			<div
				on:click={() => {
					handleNavigation(field.value.name, field.value.url);
				}}
				class="badge"
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

	<div
		on:click={() => {
			share();
		}}
		class="badge"
	>
		<div class="thumbnail">
			<SvgIcon data={Share} size={'30px'} color={'var(--secondary-text-color)'} />
		</div>
	</div>
</ul>

<Modal
	title={shareData.text}
	bind:showModal
	modalStyle="width: 95%; max-width: 800px; min-height: 400px; max-height: 500px;"
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
			class="badge-modal"
		>
			<div class="thumbnail">
				<SvgIcon data={Share} size={'30px'} color={'var(--secondary-text-color)'} />
			</div>
			<span>
				{shareData.url}
			</span>

			<span class="copy">{$t('copy')}</span>

			{#if copySuccessIndex === 0}
				<span class="copy-feedback">{$t('copied')}</span>
			{/if}
		</div>
		{#each badgeDetails as { field, fieldConfig }, index}
			{#if fieldConfig}
				<div
					on:click={(event) => {
						event.stopPropagation();
						copyToClipboard(field.value.url, index + 1);
					}}
					class="badge-modal"
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
					<span>
						{field.value.url}
					</span>

					<span class="copy">{$t('copy')}</span>

					{#if copySuccessIndex === index + 1}
						<span class="copy-feedback">{$t('copied')}</span>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
</Modal>

<style type="text/postcss">
	.copy {
		@apply text-secondary;
	}

	.badge {
		@apply flex justify-center items-center bg-primary border-primary rounded-full p-1;
	}

	.badge-modal {
		@apply relative flex gap-x-3 justify-center items-center bg-primary border-primary rounded-full p-1 font-bold cursor-pointer;
	}

	.custom-field-body {
		@apply flex rounded-md h-full w-full gap-x-2;
	}

	.modal-wrapper {
		@apply flex w-[95%] mx-auto flex-col gap-y-2 mt-5;
	}

	.thumbnail {
		@apply bg-white rounded-full p-0.5;
	}

	.copy-feedback {
		@apply absolute text-success text-sm font-bold z-10 right-0 -top-3;
	}
</style>
