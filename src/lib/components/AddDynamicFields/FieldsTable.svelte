<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import { dndzone } from 'svelte-dnd-action';
	import Close from '../../utils/icons/close.svg?raw';
	import SvgIcon from '../SvgIcon.svelte';
	import Label from '../Label.svelte';

	interface Props {
		label?: string;
		fields: any;
		field: any;
		autofillOptions?: any;
		defaultField: any;
		isAddModalOpen?: boolean;
	}

	let {
		label = 'Custom fields',
		fields = $bindable(),
		field = $bindable(),
		autofillOptions = [],
		defaultField,
		isAddModalOpen = $bindable(false)
	}: Props = $props();

	const addField = () => {
		isAddModalOpen = true;
	};

	const removeField = (index) => {
		fields = fields.filter((_, i) => i !== index);
	};

	const editField = (index) => {
		field = fields.find((_, i) => i === index);
		isAddModalOpen = true;
	};

	const handleDndConsider = (e) => {
		fields = e.detail.items;
	};

	const handleDndFinalize = (e) => {
		fields = e.detail.items;
	};
</script>

<div>
	<div class="field-body">
		<Label {label} errors={[]} />
		<button onclick={preventDefault(addField)} class="add-field-button">Add field</button>
	</div>
	<div class="custom-field-body">
		<div class="field-header">
			<div class="header-item">Key</div>
			<div class="header-item">Type</div>
			<div class="header-item">Is required</div>
			<div class="header-item">Is filter</div>
		</div>
		<div
			class="fields"
			use:dndzone={{ items: fields }}
			onconsider={handleDndConsider}
			onfinalize={handleDndFinalize}
		>
			{#if fields.length}
				{#each fields as field, index (field.id)}
					<div class="field-item">
						<div class="field">{field.key['en']}</div>
						<div class="field">{field.type}</div>
						<div class="field">{field.isRequired}</div>
						<div class="field last-item">
							{field.isFilter}
							<div class="remove-button" onclick={preventDefault(() => editField(index))}>Edit</div>
							<div class="remove-button" onclick={preventDefault(() => removeField(index))}>
								<SvgIcon data={Close} size={'30px'} color={'white'} />
							</div>
						</div>
					</div>
				{/each}
			{:else}
				<div class="no-field">Please add fields</div>
			{/if}
		</div>
	</div>
</div>

<style type="text/postcss">
	.field-item {
		@apply flex w-full text-primary font-bold justify-between flex-1 p-3 cursor-move border-primary rounded-md;
		transition: background-color 0.2s ease;
	}
	.field-item:hover {
		@apply bg-secondary;
	}

	.field-body {
		@apply flex gap-x-5;
	}

	.add-field-button {
		@apply text-white font-bold p-2 px-5 rounded-xl bg-accent;
	}

	.custom-field-body {
		@apply flex flex-col my-3;
	}

	.field-header {
		@apply flex items-center justify-between text-primary font-bold text-xl;
	}

	.field-header {
		@apply bg-secondary rounded-t-xl;
	}

	.header-item {
		@apply pl-2 flex-1 border-solid border-r-2 border-gray-500;
	}

	.field:last-child,
	.header-item:last-child {
		@apply border-none;
	}

	.fields {
		@apply mt-3 flex flex-col gap-y-2 rounded-b-xl;
	}

	.field {
		@apply flex-1 h-[30px] items-center pl-2 border-r-2 border-solid border-gray-500 text-primary font-bold;
	}

	.no-field {
		@apply flex-1 h-[30px] items-center text-primary font-bold pt-1;
		text-align: center;
	}

	.remove-button {
		@apply flex justify-center items-center cursor-pointer;
	}

	.last-item {
		@apply flex justify-between;
	}
</style>
