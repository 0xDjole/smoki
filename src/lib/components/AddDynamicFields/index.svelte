<script lang="ts">
	import Input from '../Input/index.svelte';
	import Modal from '../Modal/index.svelte';
	import Close from '../../utils/icons/close.svg?raw';
	import SvgIcon from '../SvgIcon.svelte';
	import NiceSelect from '../NiceSelect/index.svelte';
	import DropDown from '../DropDown/index.svelte';
	import Properties from './Properties.svelte';
	import Label from '../Label.svelte';

	export let label = 'Custom fields';
	export let fields;

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

	const defaultField = {
		key: '',
		type: '',
		operation: 'equals',
		isRequired: true,
		isFilter: true,
		properties: {
			range: {}
		}
	};

	let field = defaultField;

	let fieldStatus = {
		key: {
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

		<DropDown
			label="Type"
			options={types}
			bind:errors={fieldStatus.type.errors}
			bind:value={field.type}
		/>

		<Properties
			label="Properties"
			fieldType={field.type}
			bind:value={field.properties}
			bind:errors={fieldStatus.properties.errors}
		/>
	</div>
</Modal>

<div>
	<div class="flex">
		<Label {label} errors={[]} />

		<button on:click={addField} class="text-primary font-bold p-2 bg-primary">Add field</button>
	</div>
	<div class="custom-field-body">
		<div>
			{#each fields as field, index}
				<div class="field-item">
					<div class="fields">
						<span>Key: {field.key}</span>
						<span>Type: {field.type}</span>
						<span>Condition: {field.condition}</span>
						<span>Is required: {field.isRequired}</span>
						<span>Is filter: {field.isFilter}</span>
					</div>

					<div on:click={() => removeField(index)}>
						<SvgIcon data={Close} size={'30px'} color={'white'} />
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style type="text/postcss">
	.custom-field-body {
		@apply flex flex-col rounded-md p-2 gap-y-2;
	}

	.add-field-body {
		@apply p-3 h-[600px] overflow-y-scroll;
	}

	.field-item {
		@apply flex text-primary font-bold justify-between;
	}

	.fields {
		@apply flex text-primary font-bold gap-2;
	}
</style>
