<script lang="ts">
	import { v4 } from '@lukeed/uuid';

	import Input from '../Input/index.svelte';
	import Upload from '../Upload.svelte';
	import Modal from '../Modal/index.svelte';
	import Close from '../../utils/icons/close.svg?raw';
	import SvgIcon from '../SvgIcon.svelte';
	import NiceSelect from '../NiceSelect/index.svelte';
	import DropDown from '../DropDown/index.svelte';
	import Properties from './Properties.svelte';
	import Label from '../Label.svelte';

	export let label = 'Custom fields';
	export let fields;
	export let autofillOptions = [];

	const types = [
		{ label: 'Text', value: 'text' },
		{ label: 'Number', value: 'number' },
		{ label: 'Boolean', value: 'boolean' },
		{ label: 'Date', value: 'date' }
	];

	const isRequiredOptions = [
		{ label: 'Is required', value: true },
		{ label: 'Is not required', value: false }
	];

	const isFilterOptions = [
		{ label: 'Is filter', value: true },
		{ label: 'Is not filter', value: false }
	];

	const uiOptions = {
		text: [
			{ label: 'Default', value: 'default' },
			{ label: 'Nice select', value: 'nice_select' }
		],
		number: [
			{ label: 'Default', value: 'default' },
			{ label: 'Nice select', value: 'nice_select' }
		],
		date: [
			{ label: 'Default', value: 'default' },
			{ label: 'Nice select', value: 'nice_select' }
		],
		boolean: [{ label: 'Default', value: 'default' }]
	};

	const defaultField = {
		id: v4(),
		key: '',
		type: '',
		ui: 'default',
		operation: 'equals',
		isRequired: true,
		isFilter: true,
		properties: null,
		autofillIds: []
	};

	let field = defaultField;

	let fieldStatus = {
		key: {
			errors: []
		},
		ui: {
			errors: []
		},
		autofillIds: {
			errors: []
		},
		type: {
			errors: []
		},
		operation: {
			errors: []
		},
		isRequired: {
			errors: []
		},
		isFilter: {
			errors: []
		},
		properties: {
			errors: []
		}
	};

	const addField = () => {
		isAddModalOpen = true;
	};

	const confirmFieldAdd = () => {
		fields = [...fields, field];

		field = defaultField;
		isAddModalOpen = false;
	};

	const removeField = (index) => {
		fields = fields.filter((_, i) => i !== index);
	};

	let isAddModalOpen = false;
</script>

<Modal
	showModal={isAddModalOpen}
	confirmText="Add"
	title="Create a field"
	confirm={confirmFieldAdd}
	onCancel={() => {
		isAddModalOpen = false;
	}}
>
	<div class="add-field-body">
		<Input
			label="Key"
			bind:errors={fieldStatus.key.errors}
			bind:value={field.key}
			type="text"
			kind="primary"
			placeholder="Please enter key"
		/>

		<NiceSelect label="Is requird" bind:value={field.isRequired} options={isRequiredOptions} />

		<NiceSelect label="Is filter" bind:value={field.isFilter} options={isFilterOptions} />

		<Upload label="Thumbnail" bind:image={field.thumbnail} />

		<DropDown
			label="Type"
			options={types}
			bind:errors={fieldStatus.type.errors}
			bind:value={field.type}
		/>

		{#if field.type}
			<DropDown
				label="UI"
				options={uiOptions[field.type]}
				bind:errors={fieldStatus.ui.errors}
				bind:value={field.ui}
			/>
		{/if}

		<Properties
			label="Properties"
			fieldType={field.type}
			bind:value={field.properties}
			bind:errors={fieldStatus.properties.errors}
		/>

		<DropDown
			label="Autofill"
			isMultiSelect={true}
			options={autofillOptions}
			bind:errors={fieldStatus.type.errors}
			bind:value={field.autofillIds}
		/>
	</div>
</Modal>

<div>
	<div class="field-body">
		<Label {label} errors={[]} />

		<button on:click={addField} class="add-field-button">Add field</button>
	</div>
	<div class="custom-field-body">
		<div class="field-header">
			<div class="header-item">Key</div>
			<div class="header-item">Type</div>
			<div class="header-item">Operation</div>
			<div class="header-item">Is required</div>
			<div class="header-item">Is filter</div>
		</div>
		<div class="fields">
			{#each fields as field, index}
				<div class="field-item">
					<div class="field">{field.key}</div>
					<div class="field">{field.type}</div>
					<div class="field">{field.operation}</div>
					<div class="field">{field.isRequired}</div>
					<div class="field last-item">
						{field.isFilter}
						<div class="remove-button" on:click={() => removeField(index)}>
							<SvgIcon data={Close} size={'30px'} color={'white'} />
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style type="text/postcss">
	.add-field-body {
		@apply p-3 h-[550px] overflow-y-scroll;
	}

	.field-item {
		@apply flex w-full text-primary font-bold justify-between flex-1;
	}

	.field-body {
		@apply flex gap-x-5;
	}

	.add-field-button {
		@apply text-primary font-bold p-2 px-5 rounded-xl bg-accent;
	}

	.custom-field-body {
		@apply flex flex-col my-3;
	}

	.field-header,
	.field-item {
		@apply flex items-center justify-between text-white font-bold text-xl;
	}

	.field-header {
		@apply bg-secondary rounded-t-xl;
	}

	.header-item {
		@apply pl-2 flex-1;
	}

	.fields {
		@apply bg-accent;
	}

	.field {
		@apply flex-1 pl-2;
	}

	.remove-button {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.last-item {
		@apply flex;
	}
</style>
