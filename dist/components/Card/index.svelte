<script>export let onConfirm;
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

<style>
	.card-body {
		position: relative;
		display: grid;
}
	.image {
		position: absolute;
		-o-object-fit: fill;
		   object-fit: fill;
		height: 100%;
		width: 100%;
		z-index: 0;
}
	.item {
		display: grid;
		height: 100%;
		cursor: default;
		border-radius: 0.75rem;
		background-color: var(--primary-background-color);
		font-weight: 700;
		color: var(--primary-text-color);
		transition-property: transform;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
		border-color: var(--primary-border-color);
		border-width: 1px;
		border-style: solid;
}
	.item:hover {
		border-color: var(--success-border-color);
		border-width: 1px;
		border-style: solid;
}
	.item {
		grid-auto-rows: 5fr 1fr;
		overflow: hidden;
		width: 100%;
	}
	.name {
		z-index: 0;
		display: grid;
		align-items: center;
		text-align: center;
}
	.name-bottom {
		z-index: 0;
		display: grid;
		align-items: center;
}
	.span-name {
		overflow: hidden;
		overflow-wrap: break-word;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		font-size: 1.5rem;
		line-height: 2rem;
}
	.span-name-bottom {
		overflow: hidden;
		overflow-wrap: break-word;
		padding-left: 0.5rem;
		font-size: 1.5rem;
		line-height: 2rem;
}
	.bottom {
		z-index: 0;
		display: grid;
		border-top-width: 2px;
		background-color: var(--primary-background-color);
		border-color: var(--primary-border-color);
		border-width: 1px;
		border-style: solid;
		grid-auto-flow: column;
}
	.bottom-right {
		display: grid;
		cursor: pointer;
		align-items: center;
		padding: 0.5rem;
		justify-content: end;
}</style>
