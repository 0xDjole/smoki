<script lang="ts">
	import Input from '$lib/utils/components/Input/index.svelte';

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

<style type="text/postcss">
	.custom-field-body {
		@apply flex flex-col   border-secondary rounded-md p-2 gap-y-2;
	}
</style>
