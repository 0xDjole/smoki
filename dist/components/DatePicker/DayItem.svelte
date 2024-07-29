<script>export let viewDate;
export let onSelect;
let hovering = false;
const onPointerEnter = () => (hovering = true);
const onPointerLeave = () => (hovering = false);
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
	on:pointerleave={onPointerLeave}
	on:pointerenter={onPointerEnter}
	class="item day-of-month {dynamicClass}"
>
	<span>
		{viewDate.date.day}
	</span>
</button>

<style>
	.day-of-month {
		display: grid;
		height: 2.5rem;
		width: 2.5rem;
		cursor: pointer;
		border-radius: 9999px;
		text-align: center;
		font-weight: 700;
		color: var(--primary-text-color);
		box-sizing: border-box;
		align-items: center;
		justify-items: center;
		font-size: 20px;
}

	.day-color-faded {
		opacity: 0.4;
	}

	.hoverSuccess {
		opacity: 0.5;
}

	.hoverError {
		background-color: var(--error-background-color);
}

	.selected {
		border-width: 3px;
		border-style: solid;
		--tw-border-opacity: 1;
		border-color: rgb(209 213 219 / var(--tw-border-opacity));
		background-color: var(--success-background-color);
}

	.between {
		background: orange;
		border: 3px solid white;
	}</style>
