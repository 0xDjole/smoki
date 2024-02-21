<script>import { v4 } from '@lukeed/uuid';
import Input from '../Input/index.svelte';
import Upload from '../Upload.svelte';
import Modal from '../Modal/index.svelte';
import NiceSelect from '../NiceSelect/index.svelte';
import DropDown from '../DropDown/index.svelte';
import Properties from './Properties.svelte';
import FieldsTable from './FieldsTable.svelte';
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
	</div>

	<FieldsTable bind:isAddModalOpen bind:fields bind:autofillOptions />
</div>

<style>
	.add-field-body {

    height: 550px;

    overflow-y: scroll;

    padding: 0.75rem
}

	.field-body {

    display: flex;

    -moz-column-gap: 1.25rem;

         column-gap: 1.25rem
}</style>
