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
	import FieldsTable from './FieldsTable.svelte';
	import LocalizedLabels from '../LocalizedLabels/index.svelte';
	import Label from '../Label.svelte';
	import { add } from 'lodash';

	export let label = 'Custom fields';
	export let fields;
	export let autofillOptions = [];
	export let addEntity = () => {};

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

	export let field = defaultField;

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

	const confirmFieldAdd = () => {
		fields = [...fields, field];

		field = defaultField;
		isAddModalOpen = false;
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

		<LocalizedLabels
			label="Labels"
			bind:errors={fieldStatus.label.errors}
			bind:labels={field.label}
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
			bind:value={field}
			bind:errors={fieldStatus.properties.errors}
			{addEntity}
		>
			<div slot="entities" let:value>
				<slot name="entities" {value} />
			</div>
		</Properties>

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
	<FieldsTable bind:isAddModalOpen bind:fields bind:autofillOptions />
</div>

<style type="text/postcss">
	.add-field-body {
		@apply p-3 h-[550px] overflow-y-scroll;
	}

	.field-body {
		@apply flex gap-x-5;
	}
</style>
