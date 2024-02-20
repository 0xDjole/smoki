<script lang="ts">
	import Button from '../Button/index.svelte';
	import NiceSelect from '../NiceSelect/index.svelte';
	import Modal from '../Modal/index.svelte';
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
	confirm={() => {
		values = [];
		key = '';
	}}
	onCancel={() => {
		values = [];
		key = '';
	}}><NiceSelect disabled={true} options={values} /></Modal
>

<ul class="custom-field-body">
	{#each fields as field, index}
		<div class="field">
			<div class="key">{field.key}</div>

			<div class="value">
				{#if typeof field.value === 'boolean'}
					<Button kind={field.value ? 'success' : 'close'} />
				{:else if Array.isArray(field.value)}
					<div class="view-button" on:click={() => viewMultipleValues(field)}>
						{field.value[0]}...
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
		@apply flex text-white items-center text-xl gap-x-2 font-bold bg-secondary rounded-2xl justify-between h-[30px] md:h-[50px];
	}

	.value {
		@apply flex bg-accent rounded-xl px-3 w-[150px] md:w-[250px] h-full text-ellipsis overflow-hidden text-nowrap items-center justify-end rounded-l-none;
	}

	.view-butotn {
		@apply w-full text-end;
	}
</style>
