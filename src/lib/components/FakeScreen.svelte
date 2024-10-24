<script lang="ts">
	interface Props {
		text?: string;
	}

	let { text = 'placeholder' }: Props = $props();
</script>

<div style="height: 100%;">
	<span>{text}</span>
</div>

<style>
	div {
		background-color: red;
	}
</style>
