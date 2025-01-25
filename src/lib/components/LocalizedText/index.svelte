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
		labels?: Record<string, string>;
		errors?: string[];
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

	// Define available languages with their properties
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

	// Track currently selected language in dropdown
	let language = $state('en');

	// Get available languages for dropdown
	let availableLanguages = $derived(
		languages.filter((lang) => !labels[lang.value] || lang.isRequired)
	);

	// Initialize required languages (like English) automatically
	$effect(() => {
		// Find all required languages
		const requiredLanguages = languages.filter((lang) => lang.isRequired);

		// Create a new labels object with all required languages
		let newLabels = { ...labels };
		let labelsChanged = false;

		requiredLanguages.forEach((lang) => {
			if (!newLabels[lang.value]) {
				newLabels[lang.value] = '';
				labelsChanged = true;
			}
		});

		// Only update labels if changes were made
		if (labelsChanged) {
			labels = newLabels;
		}
	});

	// Add a new language label
	const addLabel = () => {
		errors = [];

		// Don't add if already exists
		if (labels[language]) {
			return;
		}

		// Create new labels object to trigger reactivity
		labels = {
			...labels,
			[language]: ''
		};
	};

	// Handle input changes
	const onChange = () => {
		errors = [];
	};

	// Remove a language label
	const removeLabel = (langValue: string) => {
		// Check if language exists and is not required
		const langConfig = languages.find((l) => l.value === langValue);
		if (!langConfig || langConfig.isRequired) {
			return; // Don't remove required languages
		}

		// Create new labels object without the removed language
		const { [langValue]: _, ...newLabels } = labels;
		labels = newLabels;
	};
</script>

<div class="localized-text-container">
	<div class="add-label">
		<Label {isRequired} {t} {label} errors={[]} />
		<div class="input-row">
			<div class="dropdown-container">
				<DropDown {t} options={languages} errors={[]} bind:value={language} />
			</div>
			<div class="add-btn">
				<Button size="large" kind="submit" onClick={addLabel}>Add</Button>
			</div>
		</div>
		<ErrorMessage {errors} {t} />
	</div>

	<div class="labels">
		{#each languages as lang}
			{#if labels.hasOwnProperty(lang.value) || lang.isRequired}
				<li class="label">
					<div class="label-key">
						<span class="language-name">{lang.label}</span>
						<div class="end-key">
							{#if lang.isRequired}
								<span class="required-badge">Required</span>
							{:else}
								<Button onClick={() => removeLabel(lang.value)} kind="close" />
							{/if}
						</div>
					</div>
					<div class="label-value">
						{#if type === 'html'}
							<RichText {onChange} {t} bind:value={labels[lang.value]} {placeholder} />
						{:else if type === 'text-area'}
							<TextArea
								{onChange}
								style="height: min-content; width: 100%;"
								{t}
								bind:value={labels[lang.value]}
								{placeholder}
							/>
						{:else}
							<Input
								{onChange}
								{t}
								bind:value={labels[lang.value]}
								type="text"
								kind="primary"
								{placeholder}
								class="full-width-input"
							/>
						{/if}
					</div>
				</li>
			{/if}
		{/each}
	</div>
</div>

<style lang="postcss">
	.localized-text-container {
		@apply w-full;
	}

	.add-label {
		@apply flex flex-col gap-y-3 w-full;
	}

	.input-row {
		@apply flex gap-x-3 w-full;
	}

	.dropdown-container {
		@apply flex-grow;
	}

	.add-btn {
		@apply flex-shrink-0;
	}

	.label {
		@apply flex flex-col text-xl mb-2 w-full;
	}

	.labels {
		@apply mt-3 rounded-md text-white w-full;
	}

	.label-key {
		@apply bg-secondary text-primary flex-1 p-2 flex justify-between items-center;
	}

	.language-name {
		@apply font-medium;
	}

	.label-value {
		@apply bg-primary flex-1 w-full;
	}

	.end-key {
		@apply flex items-center gap-x-2;
	}

	.required-badge {
		@apply text-success font-bold text-sm;
	}

	.full-width-input {
		@apply w-full;
	}

	:global(.full-width-input input) {
		@apply w-full;
	}
</style>
