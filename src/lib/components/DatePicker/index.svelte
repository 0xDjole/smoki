<script lang="ts">
	import { DateTime, Info } from 'luxon';
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
		let date: DateTime;
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

<style type="text/postcss">
	.wrapper {
		@apply grid bg-primary   border-secondary rounded-xl;
		width: 100%;
		@screen md {
			width: 600px;
		}
	}

	.year {
		@apply grid grid-flow-col font-bold text-primary;
		grid-template-columns: min-content min-content min-content;
	}

	.month {
		@apply grid grid-flow-col text-primary font-bold;
		grid-template-columns: min-content min-content min-content;
	}

	.date-item {
		@apply grid justify-center items-center text-2xl text-center;
		width: 100px;
	}
	.days {
		@apply grid text-primary gap-y-2;
		justify-items: center;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: repeat(7, 1fr);
	}

	.control-date {
		@apply grid cursor-pointer items-center;
	}

	.head {
		@apply grid grid-flow-col bg-secondary rounded-md;
		justify-items: center;
	}
	.weekdays {
		@apply font-bold text-lg;
	}

	.item {
		@apply grid justify-center items-center;
	}

	.head-item {
		@apply grid justify-center grid-flow-col;
		grid-template-columns: min-content;
	}
</style>
