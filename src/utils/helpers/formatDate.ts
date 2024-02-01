import type { DateTime } from 'luxon';

export default (value: DateTime, isLong = true) => {
	if (!value) return null;

	return `${value.day}/${value.month}/${value.year} ${
		isLong ? ` , ${value.hour}h:${value.minute}m` : ''
	}`;
};
