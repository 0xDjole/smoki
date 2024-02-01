export { default as errors } from './errors';
export declare const getPath: (indexPath: number[]) => string;
export declare const months: string[];
export declare const days: string[];
export declare const daysInMonth: (month: number) => number;
export declare const handleAsync: <T, U = Error>(promise: Promise<T>) => Promise<[U, undefined] | [undefined, T]>;
