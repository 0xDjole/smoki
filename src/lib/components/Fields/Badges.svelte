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

	$: console.log('fields', fields, fieldConfigs);
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
			<div class="flex justify-center items-center">
				{#if field.value.name === 'viber'}
					<SvgIcon data={Viber} size={'35px'} color={'var(--secondary-text-color)'} />
				{/if}

				{#if field.value.name === 'whatsapp'}
					<SvgIcon data={WhatsApp} size={'40px'} color={'var(--secondary-text-color)'} />
				{/if}

				{#if field.value.name === 'phone_number'}
					<SvgIcon data={PhoneNumber} size={'40px'} color={'var(--secondary-text-color)'} />
				{/if}
			</div>
		{/if}
	{/each}
</ul>

<style type="text/postcss">
	.badge {
		@apply z-10;
	}
	.custom-field-body {
		@apply flex rounded-md h-full w-full gap-x-3 py-2;
	}
</style>
