<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	let { viewDate, onSelect } = $props();
	let hovering = $state(false);

	const onPointerEnter = () => (hovering = true);
	const onPointerLeave = () => (hovering = false);
	const onClick = () => onSelect(viewDate.date);

	let dynamicClass = $derived(`${hovering && viewDate.isSelectable ? ' hoverSuccess ' : ''}
                       ${hovering && !viewDate.isSelectable ? ' hoverError ' : ''}
                       ${viewDate.isSelected ? ' selected ' : ''}
                       ${viewDate.isSelectable ? ' day-color ' : ' day-color-faded '}
                       ${viewDate.isBetween ? ' between ' : ''}`);
</script>

<button
	disabled={!viewDate.isSelectable}
	onclick={preventDefault(onClick)}
	onpointerleave={onPointerLeave}
	onpointerenter={onPointerEnter}
	class="item day-of-month {dynamicClass}"
>
	<span>
		{viewDate.dateTimeZone.day}
	</span>
</button>

<style type="text/postcss">
	.day-of-month {
		@apply grid text-primary rounded-full w-10 h-10 cursor-pointer font-bold text-center;
		box-sizing: border-box;
		align-items: center;
		justify-items: center;
		font-size: 20px;
	}

	.day-color-faded {
		opacity: 0.4;
	}

	.hoverSuccess {
		@apply opacity-50;
	}

	.hoverError {
		@apply bg-error;
	}

	.selected {
		@apply bg-success text-white border-primary border-[2px] border-solid;
	}

	.between {
		@apply bg-accent text-white border-primary;
	}
</style>
