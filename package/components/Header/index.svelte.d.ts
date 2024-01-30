/** @typedef {typeof __propDef.props}  IndexProps */
/** @typedef {typeof __propDef.events}  IndexEvents */
/** @typedef {typeof __propDef.slots}  IndexSlots */
export default class Index extends SvelteComponentTyped<{
    headerClass: any;
    sticky?: boolean | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    left: {
        class: string;
    };
    middle: {
        class: string;
    };
    right: {
        class: string;
    };
}> {
}
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        headerClass: any;
        sticky?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        left: {
            class: string;
        };
        middle: {
            class: string;
        };
        right: {
            class: string;
        };
    };
};
export {};
