import { DateTime } from 'luxon';

const hour = (from: DateTime, to: DateTime) => {
	let fromFormat = from
		? `${from.hour.toString().padStart(2, '0')}h:${from.minute.toString().padStart(2, '0')}m`
		: null;
	let toFormat = to
		? `${to.hour.toString().padStart(2, '0')}h:${to.minute.toString().padStart(2, '0')}m`
		: null;

	if (from && to && (from.day !== to.day || from.month !== to.month || from.year !== to.year)) {
		const dayDifference = to.toLocal().diff(from.toLocal(), ['days']).days;
		let nextDayIndicator = `next day`;

		if (dayDifference > 1) {
			nextDayIndicator = `in ${dayDifference} days`;
		}

		toFormat += ` (${nextDayIndicator})`;
	}

	return { fromFormat, toFormat };
};

export const getLocalizedMonths = (locale) => {
	const formatter = new Intl.DateTimeFormat(locale, { month: 'long' });
	const months = [];

	for (let month = 0; month < 12; month++) {
		const date = new Date(Date.UTC(2021, month, 1)); // Use the 1st day of each month
		const formattedMonth = formatter.format(date);
		months.push(formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1));
	}

	return months;
};

export const getLocalizedShortWeekdays = (locale) => {
	const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
	const days = [];

	// Start from an arbitrary Monday (e.g., August 2, 2021)
	for (let day = 0; day < 7; day++) {
		const date = new Date(Date.UTC(2021, 7, 2 + day));
		const formattedDay = formatter.format(date);
		days.push(formattedDay.charAt(0).toUpperCase() + formattedDay.slice(1));
	}

	return days;
};

export const getLocalizedShortWeekdaysSunday = (locale) => {
	const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
	const days = [];

	// Start from an arbitrary Monday (e.g., August 2, 2021)
	for (let day = 0; day < 7; day++) {
		const date = new Date(Date.UTC(2021, 7, 1 + day));
		const formattedDay = formatter.format(date);
		days.push(formattedDay.charAt(0).toUpperCase() + formattedDay.slice(1));
	}

	return days;
};

export const duration = (totalMinutes) => {
	const days = Math.floor(totalMinutes / 1440);
	const hours = Math.floor((totalMinutes % 1440) / 60);
	const minutes = totalMinutes % 60;

	return [
		days > 0 ? `${days}d` : '',
		hours > 0 ? `${hours}h` : '',
		minutes > 0 ? `${minutes}m` : ''
	]
		.filter((part) => part)
		.join(' ');
};

export const date = (value: DateTime, isLong = true) => {
	if (!value) return null;

	return `${value.day}/${value.month}/${value.year} ${
		isLong ? ` , ${value.hour}h:${value.minute}m` : ''
	}`;
};

export default {
	hour,
	getLocalizedMonths,
	getLocalizedShortWeekdays,
	getLocalizedShortWeekdaysSunday,
	duration,
	date
};
