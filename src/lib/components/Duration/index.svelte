<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import { createEventDispatcher } from 'svelte';
	import Modal from '../Modal/index.svelte';
	import TimePicker from '../TimePicker/index.svelte';
	import formatter from '../../utils/helpers/formatter';

	interface Props {
		confirmText?: string;
		label?: string;
		value: any;
		onConfirm?: any;
		children?: import('svelte').Snippet;
	}

	let {
		confirmText = 'Confirm',
		label = 'Add Duration',
		value = $bindable(),
		onConfirm = () => {},
		children
	}: Props = $props();

	let showModal = $state(false);
	let hours = new Array(24).fill(null).map((item, index) => ({
		text: `${index}h`,
		value: index
	}));

	let minutes = new Array(60).fill(null).map((item, index) => ({
		text: `${index}m`,
		value: index
	}));

	let days = new Array(30).fill(null).map((item, index) => ({
		text: `${index}d`,
		value: index
	}));

	let hour = $state(0);
	let minute = $state(0);
	let day = $state(0);

	const onTimePickerSelect = (value, type) => {
		if (type === 'hour') {
			hour = value;
		}

		if (type === 'minute') {
			minute = value;
		}

		if (type === 'day') {
			day = value;
		}
	};

	const onTimePickerConfirm = () => {
		value = day * 24 * 60 + hour * 60 + minute; // Include days in the calculation
		showModal = false;
		onConfirm();
	};

	let parsedValue = $derived(formatter.duration(value));
</script>

<button onclick={preventDefault(() => (showModal = true))}>{label} {parsedValue}</button>

<Modal
	title={`Pick duration`}
	{showModal}
	{confirmText}
	onCancel={() => (showModal = false)}
	confirm={() => onTimePickerConfirm()}
>
	<div class="time-range">
		<TimePicker
			selectedValue={day}
			onChange={(value) => onTimePickerSelect(value.value, 'day')}
			options={{ source: days, count: 20, sensitivity: 3 }}
		/>
		<div class="time-separator">/</div>

		<TimePicker
			selectedValue={hour}
			onChange={(value) => onTimePickerSelect(value.value, 'hour')}
			options={{ source: hours, count: 20, sensitivity: 3 }}
		/>

		<div class="time-separator">/</div>

		<TimePicker
			selectedValue={minute}
			onChange={(value) => onTimePickerSelect(value.value, 'minute')}
			options={{ source: minutes, count: 20, sensitivity: 3 }}
		/>
	</div>

	<div class="p-3">
		{@render children?.()}
	</div>
</Modal>

<style type="text/postcss">
	button {
		@apply bg-secondary flex justify-center items-center cursor-pointer p-2 my-2 rounded-xl font-bold text-lg transition-all duration-200 ease-in-out shadow-sm text-secondary hover:opacity-60 min-w-[60px];
	}

	.time-range {
		@apply flex items-center justify-center rounded-md mx-auto;
		height: 70%;
		user-select: none;
		width: 95%;

		@screen md {
			width: 60%;
		}
	}

	.time-separator {
		@apply text-primary;
		font-size: 60px;
	}
</style>
