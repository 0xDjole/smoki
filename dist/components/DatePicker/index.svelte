<script>import { DateTime } from 'luxon';
import DayItem from './DayItem.svelte';
import SvgIcon from '../SvgIcon.svelte';
import Great from '../../utils/icons/great.svg?raw';
import Less from '../../utils/icons/less.svg?raw';
import TimeZone from './TimeZone.svelte';
import formatter from '../../utils/helpers/formatter';
export let onSelect;
export let selectedValues = [];
export let availableValues = null;
export let betweenValues = [];
export let locale = 'en';
export let onChangeDate = (date) => { };
export let t;
export let timeZone;
export let onChangeTimeZone = () => { };
export let month;
export let year;
const nextMonth = () => {
    if (month === 12) {
        month = 1;
        year += 1;
        return null;
    }
    month += 1;
    dateWithFirstDay = DateTime.fromObject({
        year,
        month,
        day: 1
    });
    onChangeDate(dateWithFirstDay);
};
const previousMonth = () => {
    if (month === 1) {
        month = 12;
        year -= 1;
        return null;
    }
    month -= 1;
    dateWithFirstDay = DateTime.fromObject({
        year,
        month,
        day: 1
    });
    onChangeDate(dateWithFirstDay);
};
$: currentDate = DateTime.local().set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
});
$: month = month || currentDate.month;
$: year = year || currentDate.year;
let dateWithFirstDay = DateTime.fromObject({
    year,
    month,
    day: 1
});
$: firstWeekDay = (dateWithFirstDay.weekday.valueOf() % 7) - 1;
$: viewDates =
    timeZone &&
        new Array(42).fill(null).map((item, index) => {
            let date;
            let isSelectable = true;
            let currentDayView = index;
            let firstDayPostion = firstWeekDay === 7 ? 2 : firstWeekDay + 1;
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
            if (isSelectable && Array.isArray(availableValues)) {
                isSelectable = availableValues.some((value) => date.hasSame(value, 'day'));
            }
            const isSelected = selectedValues.some((selectedValue) => selectedValue.hasSame(date, 'day'));
            const isBetween = betweenValues.some((selectedValue) => selectedValue.hasSame(date, 'day'));
            let dateTimeZone = DateTime.fromObject({
                year: date.year,
                month: date.month,
                day: date.day
            }, { zone: timeZone });
            return {
                date,
                dateTimeZone,
                isSelected,
                isBetween,
                isSelectable
            };
        });
$: months = locale ? formatter.getLocalizedMonths(locale) : [];
$: days = locale ? formatter.getLocalizedShortWeekdaysSunday(locale) : [];
</script>

<div class="wrapper">
	<TimeZone {t} {timeZone} {onChangeTimeZone} />

	<div class="head">
		<div class="control-date" on:click|preventDefault={() => previousMonth()}>
			<SvgIcon data={Less} color={'var(--primary-text-color)'} size={'20px'} />
		</div>
		<span class="date">{months[month - 1]}, {year}</span>
		<div class="control-date" on:click|preventDefault={() => nextMonth()}>
			<SvgIcon data={Great} color={'var(--primary-text-color)'} size={'20px'} />
		</div>
	</div>

	<div class="days">
		{#each days as day}
			<div class="item weekdays">{day}</div>
		{/each}
		{#each viewDates as viewDate}
			<DayItem {onSelect} {viewDate} />
		{/each}
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		border-radius: 0.75rem;
		background-color: var(--primary-background-color);
		width: 100%
}
		@media (min-width: 768px) {
	.wrapper {
			width: 500px
	}
		}

	.days {
		display: grid;
		row-gap: 0.5rem;
		color: var(--accent-color);
		justify-items: center;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: repeat(7, 1fr)
}

	.control-date {
		display: grid;
		cursor: pointer;
		align-items: center;
		padding-left: 1.25rem;
		padding-right: 1.25rem
}

	.head {
		display: flex;
		justify-content: center;
		-moz-column-gap: 0.5rem;
		     column-gap: 0.5rem;
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 700;
		color: var(--primary-text-color)
}

	.date {
		flex: 1 1 0%;
		text-align: center;
		font-size: 1.25rem;
		line-height: 1.75rem;
		color: var(--secondary-text-color)
}

	.weekdays {
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 700
}

	.item {
		margin: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center
}</style>
