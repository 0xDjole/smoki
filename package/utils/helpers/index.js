export { default as errors } from './errors';
export const getPath = (indexPath) => {
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
export const daysInMonth = (month) => {
    return new Date(4, month, 0).getDate();
};
export const handleAsync = async (promise) => {
    return promise
        .then((data) => [undefined, data])
        .catch((err) => [err, undefined]);
};
