<script lang="ts">
	import Button from '../Button/index.svelte';
	import NiceSelect from '../NiceSelect/index.svelte';
	import DropDown from '../DropDown/index.svelte';
	import Modal from '../Modal/index.svelte';

	import Input from '../Input/index.svelte';

	export let label = '';
	export let labels = {};
	export let errors = [];

	let value = '';
	let language = 'en';

	const languages = [
		{
			label: 'English',
			value: 'en'
		},
		{
			label: 'Bih',
			value: 'bih'
		}
	];

	const addLabel = () => {
		labels[language] = value;

		value = '';
		language = 'en';
	};
</script>

<div class="add-label">
	<div>
		<Input
			{label}
			bind:errors
			bind:value
			type="text"
			kind="primary"
			placeholder="Please enter label"
		/>
	</div>

	<div>
		<DropDown options={languages} errors={[]} bind:value={language} />
	</div>

	<div class="add-btn">
		<Button onClick={addLabel}>Add</Button>
	</div>
</div>

<div class="labels">
	{#each Object.entries(labels) as [key, value]}
		<li class="label">
			<div class="label-key">{key}</div>
			<div class="label-value">{value}</div>
		</li>
	{/each}
</div>

<style lang="postcss">
	.add-label {
		@apply flex items-center gap-x-3;
	}

	.label {
		@apply flex text-xl;
	}

	.labels {
		@apply border-primary mt-3 rounded-md text-primary;
	}

	.label-key {
		@apply bg-secondary flex-1 p-2;
	}

	.label-value {
		@apply bg-accent flex-1 p-2;
	}
	.add-btn {
		@apply flex-1;
	}
</style>
