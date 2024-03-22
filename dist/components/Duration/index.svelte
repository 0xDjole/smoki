<script>import { createEventDispatcher } from 'svelte';
import Modal from '../Modal/index.svelte';
import TimePicker from '../TimePicker/index.svelte';
import formatter from '../../utils/helpers/formatter';
export let confirmText = 'Confirm';
export let label = 'Add Duration';
export let value;
let dispatch = createEventDispatcher();
let showModal = false;
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
let hour = 0;
let minute = 0;
let day = 0;
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
    dispatch('confirm');
};
$: parsedValue = formatter.duration(value);
</script>

<button on:click={() => (showModal = true)}>{label} {parsedValue}</button>

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
		<slot />
	</div>
</Modal>

<style>
	button {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		display: flex;
		min-width: 60px;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		border-radius: 0.75rem;
		background-color: var(--secondary-background-color);
		padding: 0.5rem;
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 700;
		color: var(--secondary-text-color);
		--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
		--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
		transition-property: all;
		transition-duration: 200ms;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)
}

button:hover {
		opacity: 0.6
}

	.time-range {
		margin-left: auto;
		margin-right: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.375rem;
		height: 70%;
		-webkit-user-select: none;
		   -moz-user-select: none;
		        user-select: none;
		width: 95%
}

	@media (min-width: 768px) {

	.time-range {
			width: 60%
	}
		}

	.time-separator {
		color: var(--primary-text-color);
		font-size: 60px
}</style>
