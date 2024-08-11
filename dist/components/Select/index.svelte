<script>import DropDownIcon from '../../utils/icons/dropdown.svg?raw';
import SvgIcon from '../SvgIcon.svelte';
export let value;
export let defaultOption;
export let options = [];
export let label = '';
export let labelThumbnail = null;
export let t;
export let errors = [];
export let onChange = (value) => { };
let showModal = false;
$: selectedOption = options.find((option) => option.value === value);
</script>

<div class="select">
	<button class="select-button" on:click|preventDefault={() => (showModal = !showModal)}>
		<span class="button-text">{$t(selectedOption?.label || 'choose')}</span>
		<div class="dropdown-svg">
			<SvgIcon data={DropDownIcon} width="20px" height="20px" color="white" />
		</div>
	</button>
	{#if showModal}
		<div class="options">
			{#each options as option}
				<div
					class="item"
					class:selected={option.value === value}
					on:click|preventDefault={() => {
						showModal = false;
						value = option.value;
						onChange(option.value);
					}}
				>
					{option.label}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.select {
		position: relative;
		display: flex;
		width: 100%;
		z-index: 1
}

	.select-button {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		-moz-column-gap: 0.5rem;
		     column-gap: 0.5rem;
		border-radius: 0.5rem;
		background-color: var(--accent-background-color);
		padding: 0.25rem;
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 600;
		--tw-text-opacity: 1;
		color: rgb(255 255 255 / var(--tw-text-opacity));
		outline: 2px solid transparent;
		outline-offset: 2px
}

	@media (min-width: 768px) {

		.select-button {
				font-size: 1.125rem;
				line-height: 1.75rem
		}
}

	.button-text {
		margin-left: 0.75rem;
		flex: 1 1 0%;
		text-align: center
}

	.dropdown-svg {
		flex-shrink: 0; /* Prevent the icon from shrinking */
	}

	.options {
		position: absolute;
		top: 2.5rem;
		left: 0px;
		display: flex;
		max-height: 300px;
		width: 100%;
		flex-direction: column;
		overflow: scroll;
		border-radius: 0.375rem;
		background-color: var(--secondary-background-color);
		border-color: var(--primary-border-color);
		border-width: 1px;
		border-style: solid
}

	.item {
		width: 100%;
		cursor: pointer;
		padding: 0.5rem;
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 700;
		color: var(--primary-text-color)
}

	.selected {
		border-radius: 0.375rem;
		background-color: var(--accent-background-color);
		padding: 0.25rem;
		--tw-text-opacity: 1;
		color: rgb(255 255 255 / var(--tw-text-opacity))
}</style>
