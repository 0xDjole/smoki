<script lang="ts">
	import Button from '../Button/index.svelte';
	import DropDown from '../DropDown/index.svelte';
	import Input from '../Input/index.svelte';
	import Label from '../Label.svelte';
	import TextArea from '../TextArea/index.svelte';
	import RichText from '../RichText/index.svelte';
	import ErrorMessage from '../ErrorMessage.svelte';

	interface Props {
		label?: string;
		type?: string;
		labels?: any;
		errors?: any;
		placeholder?: string;
		t: any;
		isRequired?: boolean;
	}

	let {
		label = '',
		type = 'text',
		labels = $bindable({}),
		errors = $bindable([]),
		placeholder = 'Please enter label',
		t,
		isRequired = false
	}: Props = $props();

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

	let language = $state('en');

	const addLabel = () => {
		errors = [];

		if (!labels[language]) {
			labels[language] = '';
		}
	};

	const onChange = () => {
		errors = [];
	};
</script>

<div class="add-label">
	<Label {isRequired} {t} {label} errors={[]} />

	<DropDown {t} options={languages} errors={[]} bind:value={language} />

	<div class="add-btn">
		<Button size="large" kind="submit" onClick={addLabel}>Add</Button>
	</div>

	<ErrorMessage {errors} {t} />
</div>

<div class="labels">
	{#each languages as language}
		{#if labels.hasOwnProperty(language.value) || language.isRequired}
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

				<div class="label-value">
					{#if type === 'html'}
						<RichText {onChange} {t} bind:value={labels[language.value]} {placeholder} />
					{:else if type === 'text-area'}
						<TextArea
							{onChange}
							style="height: min-content;"
							{t}
							bind:value={labels[language.value]}
							{placeholder}
						/>
					{:else}
						<Input
							{onChange}
							{t}
							bind:value={labels[language.value]}
							type="text"
							kind="primary"
							{placeholder}
						/>
					{/if}
				</div>
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
		@apply bg-secondary text-primary flex-1 p-2 flex justify-between;
	}

	.label-value {
		@apply bg-primary flex-1 flex items-center justify-between;
	}

	.end-key {
		@apply flex text-success font-bold;
	}
</style>
