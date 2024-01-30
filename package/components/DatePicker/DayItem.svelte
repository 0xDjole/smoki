<script>export let viewDate;
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
	on:click={onClick}
	on:mouseleave={onMouseLeave}
	on:mouseenter={onMouseEnter}
	class="item day-of-month {dynamicClass}"
>
	<span>
		{viewDate.date.day}
	</span>
</button>

<style>
	.day-of-month {
		display: grid;
		height: 3rem;
		width: 3rem;
		cursor: pointer;
		border-radius: 9999px;
		text-align: center;
		font-weight: 700;
		color: var(--primary-text-color);
		box-sizing: border-box;
		align-items: center;
		justify-items: center;
		font-size: 25px;
}
		@media (min-width: 768px) {
	.day-of-month {
				height: 4rem;
				width: 4rem;
		}
		}

	.day-color-faded {
		background-color: var(--secondary-background-color);
		opacity: 0.4;
}

	.day-color {
		background-color: var(--secondary-background-color);
}

	.hoverSuccess {
		--tw-bg-opacity: 1;
		background-color: rgb(96 138 0 / var(--tw-bg-opacity));
}

	.hoverError {
		background-color: var(--error-background-color);
}

	.selected {
		border-width: 3px;
		--tw-border-opacity: 1;
		border-color: rgb(209 213 219 / var(--tw-border-opacity));
		background-color: var(--success-background-color);
}

	.between {
		background: orange;
		border: 3px solid white;
	}</style>
