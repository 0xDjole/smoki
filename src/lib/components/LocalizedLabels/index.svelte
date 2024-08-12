<script lang="ts">
	import Button from '../Button/index.svelte';
	import DropDown from '../DropDown/index.svelte';
	import Input from '../Input/index.svelte';
	import Label from '../Label.svelte';
	import TextArea from '../TextArea/index.svelte';
	import ErrorMessage from '../ErrorMessage.svelte';

	export let label = '';
	export let type = 'text';
	export let labels = {};
	export let errors = [];
	export let placeholder = 'Please enter label';
	export let t;
	export let isRequired = false;

	export const languages = [
		{
			label: 'English',
			value: 'en',
			isRequired: true
		},
		{
			label: 'Bih',
			value: 'bih',
			isRequired: false
		}
	];

	let value = '';
	let language = 'en';

	const addLabel = () => {
		errors = [];
		labels[language] = value;

		value = '';
		language = 'en';
	};

	const onChange = () => {
		errors = [];
	};
</script>

<div class="add-label">
	<Label {isRequired} {t} {label} errors={[]} />

	<DropDown {t} options={languages} errors={[]} bind:value={language} />

	<div>
		{#if type === 'text'}
			<Input {onChange} {t} bind:value type="text" kind="primary" {placeholder} />
		{/if}

		{#if type === 'text-area'}
			<TextArea {onChange} style="height: min-content;" {t} bind:value {placeholder} />
		{/if}
	</div>

	<div class="add-btn">
		<Button size="large" kind="submit" onClick={addLabel}>Add</Button>
	</div>

	<ErrorMessage {errors} {t} />
</div>

<div class="labels">
	{#each languages as language}
		{#if labels[language.value] || language.isRequired}
			<li class="label">
				<div class="label-key">
					<span>{language.label}</span>

					<div class="end-key">
						{#if language.isRequired}
							<span>Required</span>
						{/if}

						<Button
							onClick={() => {
								const { [language.value]: _, ...newLabels } = labels;
								labels = newLabels;
							}}
							kind="close"
						/>
					</div>
				</div>

				{#if labels[language.value]}
					<div class="label-value">
						<span>{labels[language.value]}</span>
					</div>
				{/if}
			</li>
		{/if}
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
		@apply mt-3 rounded-md text-white;
	}

	.label-key {
		@apply bg-secondary flex-1 p-2 flex justify-between;
	}

	.label-value {
		@apply bg-accent flex-1 p-2 flex items-center justify-between;
	}

	.end-key {
		@apply flex text-success font-bold;
	}
</style>
