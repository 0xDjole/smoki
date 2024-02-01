import { writable } from 'svelte/store';
export default (defaultData) => {
    return writable(JSON.parse(JSON.stringify(defaultData)));
};
