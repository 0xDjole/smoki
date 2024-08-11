/** @typedef {typeof __propDef.props}  IndexProps */
/** @typedef {typeof __propDef.events}  IndexEvents */
/** @typedef {typeof __propDef.slots}  IndexSlots */
export default class Index extends SvelteComponentTyped<{
    showModal: any;
    onCancel: any;
    height?: string | undefined;
    top?: string | undefined;
    zIndex?: number | undefined;
    title?: string | undefined;
    disabled?: boolean | undefined;
    confirm?: (() => void) | undefined;
    confirmText?: null | undefined;
    modalStyle?: string | undefined;
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
        top?: string | undefined;
        zIndex?: number | undefined;
        title?: string | undefined;
        disabled?: boolean | undefined;
        confirm?: (() => void) | undefined;
        confirmText?: null | undefined;
        modalStyle?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
