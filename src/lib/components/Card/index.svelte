<script lang="ts">
	export let onConfirm;
	export let name = '';
	export let imageUrl = '';
	export let bottomName = '';
</script>

<div class="item">
	<div
		class="card-body"
		on:click|preventDefault={() => {
			onConfirm();
		}}
	>
		{#if imageUrl}
			<img alt="My category" class="image" src={imageUrl} />
		{/if}

		{#if name}
			<div class="name">
				<span class="span-name">
					{name.length < 30 ? name : name.substring(0, 30) + '...'}
				</span>
			</div>
		{/if}
	</div>

	{#if bottomName}
		<div class="bottom">
			<div class="name-bottom">
				<span class="span-name-bottom">
					{bottomName.length < 30 ? bottomName : bottomName.substring(0, 30) + '...'}
				</span>
			</div>
			<div class="bottom-right">
				<slot name="bottom-right" />
			</div>
		</div>
	{/if}
</div>

<style type="text/postcss">
	.card-body {
		@apply grid relative;
	}
	.image {
		@apply absolute;
		object-fit: fill;
		height: 100%;
		width: 100%;
		z-index: 0;
	}

	.item {
		@apply grid h-full bg-primary   border-secondary rounded-xl text-primary font-bold cursor-default hover:border-success  transition-transform;
		grid-auto-rows: 5fr 1fr;
		overflow: hidden;
		width: 100%;
	}

	.name {
		@apply grid z-0  text-center items-center;
	}

	.name-bottom {
		@apply grid z-0 items-center;
	}

	.span-name {
		@apply text-2xl overflow-hidden break-words px-3 py-2;
	}

	.span-name-bottom {
		@apply text-2xl overflow-hidden break-words pl-2;
	}

	.bottom {
		@apply grid bg-primary border-t-2  border-secondary z-0;
		grid-auto-flow: column;
	}

	.bottom-right {
		@apply grid items-center cursor-pointer p-2;
		justify-content: end;
	}
</style>
