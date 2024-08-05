<script lang="ts">
	import { DateTime } from 'luxon';
	import SvgIcon from '../SvgIcon.svelte';
	import Plus from '../../utils/icons/plus.svg?raw';

	export let items = [];
	export let centricDate: DateTime;
	export let selectDate;
	export let manageModalOpened = false;
	export let selectedItem = null;
	export let onDateChange = (date) => {};

	let clientWidth;
	let currentTimeTop = null;
	let currentTimeLeft = null;
	let currentTimeWidth = null;

	let viewDays = 7;

	$: if (clientWidth < 1000) {
		viewDays = 1;
	} else {
		viewDays = 7;
	}

	let parsedItems = [];

	let displayItems = [];
	let lookedFrom = {};
	let lookedFrom2 = {};
	let currentTime = DateTime.local();

	$: if (parsedItems) {
		displayItems = parsedItems.sort(sortParsed).map(handleOverlapper);
	}

	$: if (centricDate) {
		displayItems = [];
		parsedItems = [];
		lookedFrom = {};
		lookedFrom2 = {};

		items
			.filter((item) => {
				let fromDate = DateTime.fromISO(item.from);

				return viewDates.some(
					(viewDate) =>
						viewDate.date.year === fromDate.year &&
						viewDate.date.month === fromDate.month &&
						viewDate.date.day === fromDate.day
				);
			})
			.map((item) => {
				let fromDateTime = DateTime.fromISO(item.from);
				const toDateTime = DateTime.fromISO(item.to);

				let diffMinutes = toDateTime.diff(fromDateTime, ['minutes']).toObject().minutes;

				const widthResponsive = (clientWidth / viewDays) * 0.9;
				let width = widthResponsive > 240 ? 240 : widthResponsive;
				const height = toDateTime.diff(fromDateTime, ['minutes']).toObject().minutes / 60;

				let left = (fromDateTime.weekday % viewDays) * (clientWidth / viewDays) || 3;

				const isFromAnother = lookedFrom[item.from];

				if (isFromAnother && isFromAnother.length) {
					width = (width / (isFromAnother.length + 1)) * 1.2;

					lookedFrom[item.from] = [
						...lookedFrom[item.from],
						{
							height,
							left,
							index: parsedItems.length
						}
					];

					isFromAnother
						.sort((a, b) => {
							return b.height - a.height;
						})
						.map((another, index) => {
							parsedItems[another.index].width = width;
							parsedItems[another.index].left = left + (index + 1) * 80;
						});
				} else {
					lookedFrom[item.from] = [{ height, left, index: parsedItems.length }];
				}

				while (diffMinutes > 1440) {
					parsedItems = [
						...parsedItems,
						{
							...item,
							height,
							left,
							zIndex: 1,
							width,
							from: fromDateTime,
							to: fromDateTime.endOf('day').toISO()
						}
					];
					fromDateTime = fromDateTime.plus({ days: 1 }).startOf('day');

					diffMinutes -= 1440;
				}

				if (diffMinutes < 1440) {
					parsedItems = [
						...parsedItems,
						{
							...item,
							zIndex: 1,
							height,
							left,
							width,
							from: fromDateTime.toISO(),
							to: toDateTime.toISO()
						}
					];
				}
			});
	}

	const getItemStyle = (item, index) => {
		const fromDate = DateTime.fromISO(item.from);
		const toDate = DateTime.fromISO(item.to);
		const isFromMidnight = fromDate.hour === 0 && fromDate.minute === 0 && fromDate.second === 0;
		const isToMidnight = toDate.hour === 23 && toDate.minute === 59 && toDate.second === 59;

		const topRadius = isFromMidnight ? '0px' : '20px';
		const bottomRadius = isToMidnight ? '0px' : '20px';

		return `border-radius: ${topRadius} ${topRadius} ${bottomRadius} ${bottomRadius}; height: ${
			item.height * 130 - 10
		}px; top: ${(fromDate.minute / 60 + fromDate.hour) * 130 + 5}px; left: ${item.left}px; width: ${
			item.width
		}px; z-index: ${item.zIndex || index + 1}`;
	};

	const getItemTime = (item) => {
		const fromDate = DateTime.fromISO(item.from);
		const toDate = DateTime.fromISO(item.to);

		// Define your desired date format
		const dateFormat = 'MMMM d, yyyy, h:mm a'; // Example: "April 3, 2023, 10:00 AM"

		// Format the dates
		const forprimarydFromDate = fromDate.toFormat(dateFormat);
		const forprimarydToDate = toDate.toFormat(dateFormat);

		return `${forprimarydFromDate} - ${forprimarydToDate}`;
	};

	$: previousSundayDate = centricDate.minus({ days: centricDate.weekday % 7 }).startOf('day');

	$: viewDates = new Array(viewDays).fill(null).map((_, index) => {
		let date: DateTime;

		if (viewDays >= 7) {
			date = previousSundayDate.plus({ day: index });
		} else {
			date = centricDate;
		}
		return {
			date,
			isSelected: false,
			isSelectable: false
		};
	});

	$: if (viewDates) {
		const date = viewDates.find((date) => {
			return (
				date.date.year === currentTime.year &&
				date.date.month === currentTime.month &&
				date.date.day === currentTime.day
			);
		});

		if (date) {
			currentTimeTop = (currentTime.minute / 60 + currentTime.hour) * 130 + 5;
			currentTimeLeft = (currentTime.weekday % viewDays) * (clientWidth / viewDays) || 3;
			currentTimeWidth = clientWidth / viewDays - 10;
		} else {
			currentTimeTop = null;
			currentTimeLeft = null;
			currentTimeWidth = null;
		}
	}

	const handleOverlapper = (item, index: number) => {
		let fromDateTime = DateTime.fromISO(item.from);

		if (typeof lookedFrom2[item.from] === 'number') {
			lookedFrom2[item.from] += 1;
		} else {
			lookedFrom2[item.from] = 0;
		}

		const overlapper = parsedItems.find((parsedItem, filterIndex) => {
			const parsedFromItemDateTime = DateTime.fromISO(parsedItem.from);
			const parsedToItemDateTime = DateTime.fromISO(parsedItem.to);
			return (
				index !== filterIndex &&
				parsedFromItemDateTime.month === fromDateTime.month &&
				parsedFromItemDateTime.day === fromDateTime.day &&
				parsedFromItemDateTime.year === fromDateTime.year &&
				parsedToItemDateTime.hour > fromDateTime.hour &&
				parsedFromItemDateTime.hour < fromDateTime.hour
			);
		});

		if (overlapper) {
			item.width = item.width - 20;
			item.left = overlapper.left + 8 + lookedFrom2[item.from] * 50;
		}

		return item;
	};

	const sortParsed = (a, b) => {
		const AfromDate = DateTime.fromISO(a.from);
		const BfromDate = DateTime.fromISO(b.from);

		if (
			AfromDate.year === BfromDate.year &&
			AfromDate.month === BfromDate.month &&
			AfromDate.day === BfromDate.day &&
			AfromDate.minute === BfromDate.minute &&
			AfromDate.hour === BfromDate.hour
		) {
			return a.left - b.left;
		} else {
			return AfromDate.hour + AfromDate.minute / 60 - (BfromDate.hour + AfromDate.minute / 60);
		}
	};

	const handleItemClick = (item, index: number) => {
		manageModalOpened = true;
		selectedItem = item;
		displayItems = displayItems.map((parsed, parsedIndex) => {
			return {
				...parsed,
				zIndex: parsedIndex === index ? 50 : 1
			};
		});
	};

	const handleEmptyClick = () => {
		displayItems = displayItems.map((parsed) => {
			return {
				...parsed,
				zIndex: 1
			};
		});
	};
</script>

<div class="wrapper">
	<div class="head">
		<div
			class="head-item"
			on:click|preventDefault={() => {
				centricDate = centricDate.minus({
					days: viewDays
				});

				onDateChange(centricDate);
			}}
			on:keyup={() => {
				centricDate = centricDate.minus({
					days: viewDays
				});

				onDateChange(centricDate);
			}}
		>
			<span>Back</span>
		</div>

		<div
			class="head-item"
			on:click|preventDefault={() => {
				centricDate = centricDate.plus({
					days: viewDays
				});

				onDateChange(centricDate);
			}}
			on:keyup={() => {
				centricDate = centricDate.plus({
					days: viewDays
				});

				onDateChange(centricDate);
			}}
		>
			<span>Next</span>
		</div>
	</div>

	<div class="date-list" style="grid-template-columns: min-content auto;">
		<div class="date-buffer" />
		<div class="days-date">
			{#each [null, ...viewDates] as viewDate}
				{#if viewDate}
					<div class="date-header">
						<div>
							{viewDate.date.day}
							{viewDate.date.weekdayShort}, {viewDate.date.monthShort}
						</div>
						<div on:click|preventDefault={() => selectDate(viewDate.date)} class="mr-5">
							<SvgIcon data={Plus} color={'white'} size={'25px'} />
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>

	<div class="hours-and-date">
		<div class="hours">
			{#each new Array(24).fill(null) as _, hour}
				<div class="hour"><span>{`${hour.toString().padStart(2, '0')}h`}</span></div>
			{/each}
		</div>

		<div bind:clientWidth class="days" style={`grid-template-columns: repeat(${viewDays}, 1fr);`}>
			{#if currentTimeTop}
				<div
					style={`width: ${currentTimeWidth}px; left: ${currentTimeLeft}px; top: ${currentTimeTop}px`}
					class="current-time-line"
				/>
			{/if}
			{#each displayItems as item, index}
				<div
					on:keyup={() => handleItemClick(item, index)}
					on:click|preventDefault={() => handleItemClick(item, index)}
					style={getItemStyle(item, index)}
					class="calendar-item"
				>
					<div class="p-2">
						{#if item.service}
							<span>
								{item.service.name},
							</span>
						{/if}

						<span>
							{getItemTime(item)}
						</span>
					</div>
				</div>
			{/each}

			{#each viewDates as _}
				<div class="day-hour">
					{#each new Array(24).fill(null) as _}
						<div
							class="hour"
							on:keyup={handleEmptyClick}
							on:click|preventDefault={handleEmptyClick}
						/>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>

<style type="text/postcss">
	.date-list {
		@apply grid grid-flow-col border-secondary;
	}

	.date-buffer {
		@apply w-16;
	}
	.current-time-line {
		@apply absolute bg-accent h-1;
	}

	.calendar-item {
		@apply absolute bg-accent font-bold text-primary border-white border-2 border-solid;
		width: 220px;
	}
	.days-date {
		@apply grid grid-flow-col text-primary font-bold text-xl;
		grid-auto-columns: 1fr;
	}
	.hours-and-date {
		@apply grid grid-flow-col text-primary overflow-y-scroll;
		grid-template-columns: min-content auto;
		height: calc(100vh - 200px);

		@screen md {
			height: calc(100vh - 220px);
		}
	}
	.hours {
	}
	.hour {
		@apply w-full border-secondary font-bold text-xl p-3 pt-1;
		height: 130px;
		box-sizing: border-box;
	}
	.day-hour {
		@apply grid grid-flow-row w-full;
	}
	.wrapper {
		@apply grid bg-primary rounded-xl overflow-hidden relative;
		width: 100%;
		height: 100%;
	}

	.head-item {
		@apply grid w-full h-full text-primary justify-center items-center text-2xl text-center cursor-pointer py-2;
	}

	.head-item:first-child {
		@apply border-r-4  border-secondary;
	}

	.days {
		@apply grid text-primary relative;
		justify-items: start;
		box-sizing: border-box;
	}

	.head {
		@apply grid grid-flow-col rounded-md font-bold;
	}

	.date-header {
		@apply flex justify-between;
	}
</style>
