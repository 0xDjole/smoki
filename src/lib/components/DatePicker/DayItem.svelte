<script lang="ts">
	export let viewDate;
	export let onSelect;
	let hovering = false;

	const onMouseEnter = () => (hovering = true);
	const onMouseLeave = () => (hovering = false);
	const onClick = () => onSelect(viewDate.date);

	$: dynamicClass = `${hovering && viewDate.isSelectable ? ' hoverSuccess ' : ''}
                       ${hovering && !viewDate.isSelectable ? ' hoverError ' : ''}
                       ${viewDate.isSelected ? ' selected ' : ''}
                       ${viewDate.isSelectable ? ' day-color ' : ' day-color-faded '}
                       ${viewDate.isBetween ? ' between ' : ''}`;
</script>

<button
	disabled={!viewDate.isSelectable}
	on:click|preventDefault={onClick}
	on:mouseleave={onMouseLeave}
	on:mouseenter={onMouseEnter}
	class="item day-of-month {dynamicClass}"
>
	<span>
		{viewDate.date.day}
	</span>
</button>

<style type="text/postcss">
	.day-of-month {
		@apply grid text-primary rounded-full w-10 h-10 cursor-pointer font-bold text-center;
		box-sizing: border-box;
		align-items: center;
		justify-items: center;
		font-size: 20px;
		@screen md {
			@apply w-16 h-16;
		}
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
		@apply bg-success border-gray-300 border-[3px] border-solid;
	}

	.between {
		background: orange;
		border: 3px solid white;
	}
</style>
