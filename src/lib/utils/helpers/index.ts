export { default as errors } from './errors';

export const getPath = (indexPath: number[]) => {
	let pathString = '';
	for (const [index, path] of indexPath.entries()) {
		pathString = pathString.concat(`[${path}]`);

		if (index !== indexPath.length - 1) {
			pathString = pathString.concat('children');
		}
	}

	return pathString;
};

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const daysInMonth = (month: number) => {
	return new Date(4, month, 0).getDate();
};

export const handleAsync = async <T, U = Error>(
	promise: Promise<T>
): Promise<[U, undefined] | [undefined, T]> => {
	return promise
		.then<[undefined, T]>((data: T) => [undefined, data])
		.catch<[U, undefined]>((err: U) => [err, undefined]);
};
