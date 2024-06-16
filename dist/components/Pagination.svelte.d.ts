import { SvelteComponentTyped } from "svelte";
import Loader from './Loader.svelte';
declare const __propDef: {
    props: {
        items?: any[] | undefined;
        itemComponent: any;
        loaderComponent?: typeof Loader | undefined;
        fetchMore: any;
        fetchOnMount?: boolean | undefined;
        itemProps: any;
        id: any;
        notFoundText: any;
        t: any;
        height?: string | undefined;
        listStyle?: string | undefined;
    };
    events: {
        firstLoad: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PaginationProps = typeof __propDef.props;
export type PaginationEvents = typeof __propDef.events;
export type PaginationSlots = typeof __propDef.slots;
export default class Pagination extends SvelteComponentTyped<PaginationProps, PaginationEvents, PaginationSlots> {
}
export {};
