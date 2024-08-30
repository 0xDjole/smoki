<script lang="ts">
	import Label from '../Label.svelte';
	import Viber from '../../utils/icons/viber.svg?raw';
	import PhoneNumber from '../../utils/icons/phone_number.svg?raw';
	import WhatsApp from '../../utils/icons/whatsapp.svg?raw';
	import SvgIcon from '../SvgIcon.svelte';

	export let fields = [];
	export let fieldConfigs = [];
	export let locale = 'en';
	export let label = null;
	export let t;

	function cleanNumber(number: string): string {
		return number.replace(/[^0-9+]/g, '');
	}

	// Function to handle navigation for different apps
	function handleNavigation(app: string, number: string) {
		const cleanedNumber = cleanNumber(number);
		const noPlusNumber = cleanedNumber.startsWith('+') ? cleanedNumber.substring(1) : cleanedNumber;

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
</script>

{#if label}
	<div class="mb-5">
		<Label {t} {label} />
	</div>
{/if}

<ul class="custom-field-body">
	{#each fieldConfigs
		.filter((fieldConfig) => fieldConfig.type === 'badge')
		.map( (fieldConfig) => ({ fieldConfig, field: fields.find((field) => fieldConfig.id === field.fieldConfigId) }) ) as { field, fieldConfig }, index}
		{#if fieldConfig}
			<div
				on:click={() => {
					handleNavigation(field.value.name, field.value.url);
				}}
				class="badge"
			>
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
		{/if}
	{/each}
</ul>

<style type="text/postcss">
	.badge {
		@apply flex justify-center items-center z-10 bg-primary border-primary rounded-full p-1;
	}
	.custom-field-body {
		@apply flex rounded-md h-full w-full gap-x-2;
	}
</style>
