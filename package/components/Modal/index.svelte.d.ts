/** @typedef {typeof __propDef.props}  IndexProps */
/** @typedef {typeof __propDef.events}  IndexEvents */
/** @typedef {typeof __propDef.slots}  IndexSlots */
export default class Index extends SvelteComponentTyped<{
    showModal: any;
    onCancel: any;
    height?: string | undefined;
    title?: string | undefined;
    top?: string | undefined;
    zIndex?: number | undefined;
    confirmText?: null | undefined;
    confirm?: (() => void) | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        showModal: any;
        onCancel: any;
        height?: string | undefined;
        title?: string | undefined;
        top?: string | undefined;
        zIndex?: number | undefined;
        confirmText?: null | undefined;
        confirm?: (() => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
