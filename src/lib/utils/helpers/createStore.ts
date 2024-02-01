import { writable } from 'svelte/store';

export default (defaultData: any) => {
  return writable(JSON.parse(JSON.stringify(defaultData)));
};
