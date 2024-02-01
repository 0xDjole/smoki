<script>import Input from '../Input/index.svelte';
export let label = 'Custom fields';
export let fieldConfigs;
export let fields = [];
</script>

<div class="custom-field-body">
	<div>
		{#each fieldConfigs as field, index}
			<Input
				label={field.key}
				bind:errors={field.errors}
				bind:value={fields[index].value}
				type={field.type}
				kind="primary"
				placeholder="Please enter"
			/>
		{/each}
	</div>
</div>

<style>
	.custom-field-body {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    border-radius: 0.375rem;
    padding: 0.5rem;
    border-color: var(--primary-border-color);
    border-width: 1px;
    border-style: solid
}</style>
