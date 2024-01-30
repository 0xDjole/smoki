<script>import { DateTime, Info } from 'luxon';
import DayItem from './DayItem.svelte';
import SvgIcon from '../SvgIcon.svelte';
import Great from '../../utils/icons/great.svg?raw';
import Less from '../../utils/icons/less.svg?raw';
import { createEventDispatcher } from 'svelte';
export let onSelect;
export let selectedValues = [];
export let availableValues = [];
export let betweenValues = [];
export let month;
export let year;
const dispatch = createEventDispatcher();
const nextMonth = () => {
    if (month === 12) {
        month = 1;
        year += 1;
        return null;
    }
    month += 1;
};
const previousMonth = () => {
    if (month === 1) {
        month = 12;
        year -= 1;
        return null;
    }
    month -= 1;
};
const nextYear = () => {
    year += 1;
    return null;
};
const previousYear = () => {
    year -= 1;
    return null;
};
$: currentDate = DateTime.local().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
$: month = month || currentDate.month;
$: year = year || currentDate.year;
$: dateWithFirstDay = DateTime.fromObject({
    year,
    month,
    day: 1
});
$: if (dateWithFirstDay) {
    setTimeout(() => {
        dispatch('changedDate', dateWithFirstDay);
    }, 1);
}
$: firstWeekDay = dateWithFirstDay.weekday.valueOf();
$: viewDates = new Array(42).fill(null).map((item, index) => {
    let date;
    let isSelectable = true;
    let currentDayView = index + 1;
    let firstDayPostion = firstWeekDay === 7 ? 1 : firstWeekDay + 1;
    if (currentDayView === firstDayPostion) {
        date = dateWithFirstDay;
    }
    if (currentDayView < firstDayPostion) {
        date = dateWithFirstDay.minus({
            day: firstDayPostion - currentDayView
        });
    }
    if (currentDayView > firstDayPostion) {
        date = dateWithFirstDay.plus({
            day: currentDayView - firstDayPostion
        });
    }
    if (date < currentDate) {
        isSelectable = false;
    }
    if (isSelectable && availableValues.length > 0) {
        isSelectable = availableValues.some((value) => date.equals(value));
    }
    const isSelected = selectedValues.some((selectedValue) => selectedValue.equals(date));
    const isBetween = betweenValues.some((selectedValue) => selectedValue.equals(date));
    return {
        date,
        isSelected,
        isBetween,
        isSelectable
    };
});
</script>

<div>
	<div class="wrapper">
		<div class="head">
			<div class="head-item">
				<div class="year">
					<div class="control-date" on:click={() => previousYear()}>
						<SvgIcon data={Less} color={'white'} size={'20px'} />
					</div>
					<div class="date-item"><span>{year}</span></div>
					<div class="control-date" on:click={() => nextYear()}>
						<SvgIcon data={Great} color={'white'} size={'20px'} />
					</div>
				</div>
			</div>
			<div class="head-item">
				<div class="month">
					<div class="control-date" on:click={() => previousMonth()}>
						<SvgIcon data={Less} color={'white'} size={'20px'} />
					</div>
					<div class="date-item">
						<span>{Info.months()[month - 1]}</span>
					</div>
					<div class="control-date" on:click={() => nextMonth()}>
						<SvgIcon data={Great} color={'white'} size={'20px'} />
					</div>
				</div>
			</div>
		</div>
		<div class="days">
			<div class="item weekdays">Sun</div>
			<div class="item weekdays">Mon</div>
			<div class="item weekdays">Tue</div>
			<div class="item weekdays">Wed</div>
			<div class="item weekdays">Thu</div>
			<div class="item weekdays">Fri</div>
			<div class="item weekdays">Sat</div>

			{#each viewDates as viewDate}
				<DayItem {onSelect} {viewDate} />
			{/each}
		</div>
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		border-radius: 0.75rem;
		background-color: var(--primary-background-color);
		border-color: var(--primary-border-color);
		border-width: 1px;
		border-style: solid;
		width: 100%
}
		@media (min-width: 768px) {
	.wrapper {
			width: 600px
	}
		}

	.year {
		display: grid;
		grid-auto-flow: column;
		font-weight: 700;
		color: var(--primary-text-color);
		grid-template-columns: min-content min-content min-content
}

	.month {
		display: grid;
		grid-auto-flow: column;
		font-weight: 700;
		color: var(--primary-text-color);
		grid-template-columns: min-content min-content min-content
}

	.date-item {
		display: grid;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 1.5rem;
		line-height: 2rem;
		width: 100px
}

	.days {
		display: grid;
		row-gap: 0.5rem;
		color: var(--primary-text-color);
		justify-items: center;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: repeat(7, 1fr)
}

	.control-date {
		display: grid;
		cursor: pointer;
		align-items: center
}

	.head {
		display: grid;
		grid-auto-flow: column;
		border-radius: 0.375rem;
		background-color: var(--secondary-background-color);
		justify-items: center
}

	.weekdays {
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 700
}

	.item {
		display: grid;
		align-items: center;
		justify-content: center
}

	.head-item {
		display: grid;
		grid-auto-flow: column;
		justify-content: center;
		grid-template-columns: min-content
}</style>
