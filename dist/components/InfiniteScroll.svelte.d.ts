import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        threshold?: number | undefined;
        horizontal?: boolean | undefined;
        fetchTop?: (() => void) | undefined;
        fetchBottom?: (() => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type InfiniteScrollProps = typeof __propDef.props;
export type InfiniteScrollEvents = typeof __propDef.events;
export type InfiniteScrollSlots = typeof __propDef.slots;
export default class InfiniteScroll extends SvelteComponentTyped<InfiniteScrollProps, InfiniteScrollEvents, InfiniteScrollSlots> {
}
export {};
