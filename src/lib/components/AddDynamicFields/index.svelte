<script lang="ts">
	import { v4 } from '@lukeed/uuid';

	import Upload from '../Upload.svelte';
	import Modal from '../Modal/index.svelte';
	import NiceSelect from '../NiceSelect/index.svelte';
	import DropDown from '../DropDown/index.svelte';
	import Properties from './Properties.svelte';
	import FieldsTable from './FieldsTable.svelte';
	import FieldValue from './FieldValue.svelte';
	import LocalizedText from '../LocalizedText/index.svelte';

	export let label = 'Custom fields';
	export let fields;
	export let autofillOptions = [];
	export let addEntity = () => {};
	export let t;

	const types = [
		{ label: 'Text', value: 'text' },
		{ label: 'Geo Location', value: 'geo_location' },
		{ label: 'Select', value: 'select' },
		{ label: 'Number', value: 'number' },
		{ label: 'Boolean', value: 'boolean' },
		{ label: 'Date', value: 'date' },
		{ label: 'Badge', value: 'badge' },
		{ label: 'Entities', value: 'entities' }
	];

	const propertyTypes = {
		geo_location: {
			operations: [],
			defaultProperties: null,
			isOption: false,
			isRange: false,
			defaultValue: {
				lat: 50,
				lon: 50
			}
		},

		text: {
			operations: [],
			defaultProperties: {
				minLength: 0,
				maxLength: 1000
			},
			isOption: false,
			isRange: false,
			defaultValue: 'Text'
		},
		select: {
			operations: [],
			isOption: true,
			isRange: false,
			defaultProperties: null
		},

		badge: {
			operations: [],
			isOption: false,
			isRange: false,
			defaultProperties: null
		},

		boolean: {
			operations: [],
			isOption: false,
			isRange: false,
			defaultProperties: null
		},

		number: {
			operations: [
				{ label: 'Greater than', value: 'plus' },
				{ label: 'Less than', value: 'minus' },
				{ label: 'Less than or equal', value: 'less_than_or_equal' },
				{ label: 'Greater than or equal', value: 'greater_than_or_equal' },
				{ label: 'Equals', value: 'equals' },
				{ label: 'Greater than', value: 'greater_than' },
				{ label: 'Less than', value: 'less_than' },
				{ label: 'Contains', value: 'contains' },
				{ label: 'Range', value: 'range' }
			],
			isOption: true,
			isRange: true,
			defaultProperties: null
		},
		date: {
			operations: [
				{ label: 'Greater than', value: 'plus' },
				{ label: 'Less than', value: 'minus' },
				{ label: 'Less than or equal', value: 'less_than_or_equal' },
				{ label: 'Greater than or equal', value: 'greater_than_or_equal' },
				{ label: 'Equals', value: 'equals' },
				{ label: 'Greater than', value: 'greater_than' },
				{ label: 'Less than', value: 'less_than' },
				{ label: 'Contains', value: 'contains' },
				{ label: 'Range', value: 'range' }
			],
			isOption: true,
			isRange: true,
			defaultProperties: null
		},
		entities: {
			operations: [],
			isOption: false,
			isRange: false,
			defaultProperties: null
		}
	};

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
			{ label: 'Text area', value: 'text_area' },
			{ label: 'Plain localized', value: 'plain_localized' }
		],
		select: [
			{ label: 'Default', value: 'default' },
			{ label: 'Nice select', value: 'nice_select' }
		],
		number: [
			{ label: 'Default', value: 'default' },
			{ label: 'Nice select', value: 'nice_select' }
		],
		geo_location: [{ label: 'Default', value: 'default' }],

		date: [
			{ label: 'Default', value: 'default' },
			{ label: 'Nice select', value: 'nice_select' }
		],
		boolean: [{ label: 'Default', value: 'default' }],
		badge: [{ label: 'Default', value: 'default' }],
		entities: [{ label: 'Default', value: 'default' }]
	};

	export let field;

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

	const defaultField = {
		id: v4(),
		translations: {},
		key: {},
		type: '',
		ui: 'default',
		isRequired: true,
		isFilter: true,
		properties: null,
		autofillIds: [],
		entityIds: [],
		defaultValue: null
	};

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
			<LocalizedText {t} label="Key" bind:errors={fieldStatus.key.errors} bind:labels={field.key} />
			<NiceSelect
				{t}
				label="Is requird"
				bind:value={field.isRequired}
				options={isRequiredOptions}
			/>

			<NiceSelect {t} label="Is filter" bind:value={field.isFilter} options={isFilterOptions} />

			<Upload {t} label="Thumbnail" bind:file={field.thumbnail} />

			<DropDown
				{t}
				label="Type"
				options={types}
				bind:errors={fieldStatus.type.errors}
				bind:value={field.type}
				onSelect={(value) => {
					field.properties = JSON.parse(JSON.stringify(propertyTypes[value]));
				}}
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
				{propertyTypes}
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

			<FieldValue {t} locale="en" fieldConfig={field} bind:fieldValue={field.defaultValue} />
		</div>
	</Modal>

	<div>
		<FieldsTable {label} bind:isAddModalOpen bind:field bind:fields bind:autofillOptions />
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
