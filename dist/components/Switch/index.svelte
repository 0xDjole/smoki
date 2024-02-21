<script>
	import Label from '../Label.svelte';
	export let value = false;
	export let color = '#2196F3';

	export let label = '';
	export let labelThumbnail = null;
	export let errors = [];
</script>

<div class="switch-container">
	<Label {errors} {label} {labelThumbnail} />

	<label class="switch">
		<input type="checkbox" bind:checked={value} />
		<span class="slider" />
	</label>
</div>

<style>
	.switch-container {
		display: flex;
		align-items: center;
		-moz-column-gap: 0.75rem;
		     column-gap: 0.75rem;
}

	.switch {
		position: relative;
		display: inline-block;
		height: 25px;
		width: 50px;
}

	@media (min-width: 768px) {

		.switch {
				height: 34px;
				width: 60px;
		}
}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		background-color: var(--secondary-background-color);
		border-color: var(--primary-border-color);
		border-width: 1px;
		border-style: solid;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transition: 0.4s;
		border-radius: 34px;
}

	.slider:before {
		position: absolute;
		left: 4px;
		bottom: 3px;
		height: 17px;
		width: 17px;
		border-radius: 9999px;
		--tw-bg-opacity: 1;
		background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

	@media (min-width: 768px) {

		.slider:before {
				height: 26px;
				width: 26px;
		}
}

	.slider:before {
		content: '';
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: var(--accent-background-color);
		box-shadow: 0 0 1px #2196f3;
}

	input:checked + .slider:before {
		transform: translateX(24px);
	}</style>
