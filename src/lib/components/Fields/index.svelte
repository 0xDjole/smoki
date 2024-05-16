<script lang="ts">
	import Button from '../Button/index.svelte';
	import NiceSelect from '../NiceSelect/index.svelte';
	import Modal from '../Modal/index.svelte';
	import translateLabel from '../../utils/helpers/translateLabel';

	import { locale } from 'svelte-i18n';

	export let fields = [];

	let values = [];
	let key = '';

	const viewMultipleValues = (field) => {
		key = field.key;
		values = field.value.map((value) => ({
			label: value,
			value
		}));
	};
</script>

<Modal
	showModal={values.length}
	confirmText="Close"
	title={key}
	zIndex={1000}
	confirm={() => {
		values = [];
		key = '';
	}}
	onCancel={() => {
		values = [];
		key = '';
	}}><div class="modal-body"><NiceSelect disabled={true} options={values} /></div></Modal
>

<ul class="custom-field-body">
	{#each fields.filter((field) => {
		if (field.value === null) {
			return false;
		}

		if (Array.isArray(field.value) && !field.value.length) {
			return false;
		}

		return true;
	}) as field, index}
		<div
			class="field"
			on:click|preventDefault={() => Array.isArray(field.value) && viewMultipleValues(field)}
		>
			<div class="key">{translateLabel(field.label, $locale, field.key)}</div>

			<div class="value">
				{#if typeof field.value === 'boolean'}
					<Button kind={field.value ? 'success' : 'close'} />
				{:else if Array.isArray(field.value)}
					<div class="view-button">
						{field.value.join(', ')}
					</div>
				{:else}
					<span>{field.value}</span>
				{/if}
			</div>
		</div>
	{/each}
</ul>

<style type="text/postcss">
	.custom-field-body {
		@apply flex flex-col rounded-md gap-y-2 h-full w-[95%] md:w-[80%];
	}

	.key {
		@apply p-2;
	}

	.field {
		@apply flex cursor-pointer text-white items-center text-xl gap-x-2 font-bold bg-secondary rounded-2xl justify-between h-[30px] md:h-[50px];
	}

	.value {
		@apply flex bg-accent rounded-xl px-3 w-[150px] md:w-[250px] h-full text-ellipsis overflow-hidden text-nowrap items-center justify-end rounded-l-none;
	}

	.view-button {
		@apply w-full text-end cursor-pointer text-ellipsis overflow-hidden;
	}

	.modal-body {
		@apply m-3;
	}
</style>
