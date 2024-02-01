/** @typedef {typeof __propDef.props}  IndexProps */
/** @typedef {typeof __propDef.events}  IndexEvents */
/** @typedef {typeof __propDef.slots}  IndexSlots */
export default class Index extends SvelteComponentTyped<{
    showBorder?: boolean | undefined;
    sticky?: boolean | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    left: {};
    middle: {};
    right: {};
}> {
}
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        showBorder?: boolean | undefined;
        sticky?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        left: {};
        middle: {};
        right: {};
    };
};
export {};
