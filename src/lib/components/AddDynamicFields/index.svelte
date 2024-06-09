<script lang="ts">
	import { v4 } from '@lukeed/uuid';

	import Input from '../Input/index.svelte';
	import Upload from '../Upload.svelte';
	import Modal from '../Modal/index.svelte';
	import NiceSelect from '../NiceSelect/index.svelte';
	import DropDown from '../DropDown/index.svelte';
	import Properties from './Properties.svelte';
	import FieldsTable from './FieldsTable.svelte';
	import LocalizedLabels from '../LocalizedLabels/index.svelte';

	export let label = 'Custom fields';
	export let fields;
	export let autofillOptions = [];
	export let addEntity = () => {};
	export let t;

	const types = [
		{ label: 'Text', value: 'text' },
		{ label: 'Number', value: 'number' },
		{ label: 'Boolean', value: 'boolean' },
		{ label: 'Date', value: 'date' },
		{ label: 'Entities', value: 'entities' }
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
		boolean: [{ label: 'Default', value: 'default' }],
		entities: [{ label: 'Default', value: 'default' }]
	};

	export let field;
	export let defaultField;

	let fieldStatus = {
		key: {
			errors: []
		},
		label: {
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

	const confirmField = () => {
		const fieldIdx = fields.findIndex((existingFields) => existingFields.id === field.id);

		if (fieldIdx !== -1) {
			fields[fieldIdx] = field;
		} else {
			fields = [...fields, field];
		}

		field = defaultField;
		isAddModalOpen = false;
	};

	let isAddModalOpen = false;

	$: if (!field) {
		field = defaultField;
	}
</script>

{#if field}
	<Modal
		showModal={isAddModalOpen}
		modalStyle="width: 95%; max-width: 800px;"
		confirmText="Add"
		title="Create a field"
		confirm={confirmField}
		onCancel={() => {
			isAddModalOpen = false;
		}}
	>
		<div class="add-field-body">
			<Input
				{t}
				label="Key"
				bind:errors={fieldStatus.key.errors}
				bind:value={field.key}
				type="text"
				kind="primary"
				placeholder="Please enter key"
			/>

			<LocalizedLabels
				{t}
				label="Translations"
				bind:errors={fieldStatus.label.errors}
				bind:labels={field.translations}
			/>
			<NiceSelect
				{t}
				label="Is requird"
				bind:value={field.isRequired}
				options={isRequiredOptions}
			/>

			<NiceSelect {t} label="Is filter" bind:value={field.isFilter} options={isFilterOptions} />

			<Upload {t} label="Thumbnail" bind:image={field.thumbnail} />

			<DropDown
				{t}
				label="Type"
				options={types}
				bind:errors={fieldStatus.type.errors}
				bind:value={field.type}
			/>

			{#if field.type}
				<DropDown
					{t}
					label="UI"
					options={uiOptions[field.type]}
					bind:errors={fieldStatus.ui.errors}
					bind:value={field.ui}
				/>
			{/if}

			<Properties
				{t}
				label="Properties"
				fieldType={field.type}
				bind:value={field}
				bind:errors={fieldStatus.properties.errors}
				{addEntity}
			>
				<div slot="entities" let:value>
					<slot name="entities" {value} />
				</div>
			</Properties>

			<DropDown
				{t}
				label="Autofill"
				isMultiSelect={true}
				options={autofillOptions}
				bind:errors={fieldStatus.type.errors}
				bind:value={field.autofillIds}
			/>
		</div>
	</Modal>

	<div>
		<FieldsTable bind:isAddModalOpen bind:field bind:fields bind:autofillOptions />
	</div>
{/if}

<style type="text/postcss">
	.add-field-body {
		@apply p-3 h-[550px] overflow-y-scroll;
	}

	.field-body {
		@apply flex gap-x-5;
	}
</style>
