<script lang="ts">
	import Label from '../Label.svelte';
	export let value = false;
	export let color = '#2196F3';

	export let label = '';
	export let labelThumbnail = null;
	export let errors = [];
	export let t;
	export let isRequired = false;
	export let onChange = (isChecked) => {};
</script>

<div class="switch-container">
	<Label {isRequired} {t} {errors} {label} {labelThumbnail} />

	<label class="switch">
		<input type="checkbox" bind:checked={value} on:change={(e) => onChange(e.target.checked)} />
		<span class="slider" />
	</label>
</div>

<style type="text/postcss">
	.switch-container {
		@apply flex items-center gap-x-3;
	}

	.switch {
		@apply relative inline-block w-[50px] h-[25px] md:w-[60px] md:h-[34px];
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		@apply absolute cursor-pointer bg-secondary border-primary;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		-webkit-transition: 0.4s;
		transition: 0.4s;
		border-radius: 34px;
	}

	.slider:before {
		@apply bg-white border-primary absolute w-[17px] h-[17px] md:w-[26px] md:h-[26px] rounded-full left-[4px] bottom-[3px];
		content: '';
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		@apply bg-accent;
	}

	input:checked + .slider {
		box-shadow: 0 0 1px #2196f3;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(24px);
		-ms-transform: translateX(24px);
		transform: translateX(24px);
	}
</style>
