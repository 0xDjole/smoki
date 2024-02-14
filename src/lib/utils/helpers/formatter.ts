import { DateTime } from 'luxon';

const formatHour = (from: DateTime, to: DateTime) => {
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

export default {
	formatHour
};
