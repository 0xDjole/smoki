<script lang="ts">
	import Modal from '../Modal/index.svelte';

	import SvgIcon from '../SvgIcon.svelte';
	import Label from '../Label.svelte';
	import DropDownIcon from '../../utils/icons/dropdown.svg?raw';

	export let values = [];
	export let options = [];
	export let label = '';
	export let labelThumbnail = null;
	export let errors = [];
	export let t;
	export let isRequired = false;
	export let onSelect = (values) => {};

	let showModal = false;

	const selectOption = (optionValue) => {
		const isSelected = values.includes(optionValue);
		if (isSelected) {
			values = values.filter((value) => value !== optionValue);
		} else {
			values = [...values, optionValue];
		}
		onSelect(optionValue);
	};
</script>

<div>
	<Label {isRequired} {t} {errors} {label} {labelThumbnail} />
	<div
		on:click|preventDefault={() => (showModal = true)}
		class="flex justify-between option bg-secondary border-primary selected"
	>
		<span>{values.length ? values.join(', ') : 'Choose'}</span>

		<SvgIcon data={DropDownIcon} width={'25px'} size={'25px'} color={'white'} />
	</div>
</div>

<Modal
	confirm={() => (showModal = false)}
	confirmText={'Choose'}
	height={'60%'}
	title={'Choose'}
	{showModal}
	onCancel={() => (showModal = false)}
>
	<div class="px-3">
		{#each options as option}
			<div
				on:click|preventDefault={() => selectOption(option.value)}
				class:selected={values.includes(option.value)}
				class="option bg-secondary border-primary"
			>
				{option.label}
			</div>
		{/each}
	</div>
</Modal>

<style type="text/postcss">
	.option {
		@apply cursor-pointer p-1 md:p-3 rounded-md font-bold text-lg transition-all duration-200 ease-in-out shadow-sm text-secondary hover:opacity-60;
	}

	.selected {
		@apply bg-accent text-white;
	}
</style>
