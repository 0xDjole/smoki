/** @typedef {typeof __propDef.props}  IndexProps */
/** @typedef {typeof __propDef.events}  IndexEvents */
/** @typedef {typeof __propDef.slots}  IndexSlots */
export default class Index extends SvelteComponentTyped<{
    size?: null | undefined;
    width?: null | undefined;
    height?: null | undefined;
    duration?: number | undefined;
    zIndex?: number | undefined;
    open?: boolean | undefined;
    placement?: string | undefined;
    left?: null | undefined;
    targetElement?: null | undefined;
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
        size?: null | undefined;
        width?: null | undefined;
        height?: null | undefined;
        duration?: number | undefined;
        zIndex?: number | undefined;
        open?: boolean | undefined;
        placement?: string | undefined;
        left?: null | undefined;
        targetElement?: null | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
