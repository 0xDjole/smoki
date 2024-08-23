/** @typedef {typeof __propDef.props}  InfiniteScrollProps */
/** @typedef {typeof __propDef.events}  InfiniteScrollEvents */
/** @typedef {typeof __propDef.slots}  InfiniteScrollSlots */
export default class InfiniteScroll extends SvelteComponentTyped<{
    threshold?: number | undefined;
    fetchTop?: (() => void) | undefined;
    fetchBottom?: (() => void) | undefined;
    horizontal?: boolean | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type InfiniteScrollProps = typeof __propDef.props;
export type InfiniteScrollEvents = typeof __propDef.events;
export type InfiniteScrollSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        threshold?: number | undefined;
        fetchTop?: (() => void) | undefined;
        fetchBottom?: (() => void) | undefined;
        horizontal?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
