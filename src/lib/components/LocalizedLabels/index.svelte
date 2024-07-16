<script lang="ts">
	import Button from '../Button/index.svelte';
	import DropDown from '../DropDown/index.svelte';
	import Input from '../Input/index.svelte';
	import Label from '../Label.svelte';
	import TextArea from '../TextArea/index.svelte';

	export let label = '';
	export let type = 'text';
	export let labels = {};
	export let errors = [];
	export let placeholder = 'Please enter label';
	export let t;
	export let isRequired = false;

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
	<Label {isRequired} {t} {label} errors={[]} />

	<DropDown {t} options={languages} errors={[]} bind:value={language} />

	<div>
		{#if type === 'text'}
			<Input {t} bind:errors bind:value type="text" kind="primary" {placeholder} />
		{/if}

		{#if type === 'text-area'}
			<TextArea style="height: min-content;" {t} bind:errors bind:value {placeholder} />
		{/if}
	</div>

	<div class="add-btn">
		<Button size="large" kind="submit" onClick={addLabel}>Add</Button>
	</div>
</div>

<div class="labels">
	{#each Object.entries(labels) as [key, value]}
		<li class="label">
			<div class="label-key">
				<span>{key}</span>

				<Button
					onClick={() => {
						const { [key]: _, ...newLabels } = labels;
						labels = newLabels;
					}}
					kind="close"
				/>
			</div>

			<div class="label-value">
				<span> {value}</span>
			</div>
		</li>
	{/each}
</div>

<style lang="postcss">
	.add-label {
		@apply flex flex-col gap-y-3;
	}

	.label {
		@apply flex flex-col text-xl mb-2;
	}

	.labels {
		@apply mt-3 rounded-md text-primary;
	}

	.label-key {
		@apply bg-secondary flex-1 p-2 flex justify-between;
	}

	.label-value {
		@apply bg-accent flex-1 p-2 flex items-center justify-between;
	}
</style>
