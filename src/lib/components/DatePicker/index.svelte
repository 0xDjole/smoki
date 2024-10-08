<script lang="ts">
	import { DateTime } from 'luxon';
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
	export let onChangeDate = (date) => {};
	export let t;
	export let timeZone;
	export let onChangeTimeZone = () => {};

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
			let date: DateTime;
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

			let dateTimeZone = DateTime.fromObject(
				{
					year: date.year,
					month: date.month,
					day: date.day
				},
				{ zone: timeZone }
			);

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

<style type="text/postcss">
	.wrapper {
		@apply flex flex-col bg-primary rounded-xl;
		width: 100%;
		@screen md {
			width: 500px;
		}
	}

	.days {
		@apply grid text-accent gap-y-2;
		justify-items: center;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: repeat(7, 1fr);
	}

	.control-date {
		@apply grid cursor-pointer items-center px-5;
	}

	.head {
		@apply flex text-primary font-bold text-xl gap-x-2 justify-center;
	}

	.date {
		@apply text-secondary text-center flex-1 text-xl;
	}

	.weekdays {
		@apply font-bold text-lg;
	}

	.item {
		@apply flex justify-center items-center m-2;
	}
</style>
