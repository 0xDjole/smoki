/** @typedef {typeof __propDef.props}  IndexProps */
/** @typedef {typeof __propDef.events}  IndexEvents */
/** @typedef {typeof __propDef.slots}  IndexSlots */
export default class Index extends SvelteComponentTyped<{
    height?: null | undefined;
    width?: null | undefined;
    left?: null | undefined;
    open?: boolean | undefined;
    zIndex?: number | undefined;
    size?: null | undefined;
    duration?: number | undefined;
    placement?: string | undefined;
    targetElement?: null | undefined;
    bindHeightToTarget?: boolean | undefined;
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
        height?: null | undefined;
        width?: null | undefined;
        left?: null | undefined;
        open?: boolean | undefined;
        zIndex?: number | undefined;
        size?: null | undefined;
        duration?: number | undefined;
        placement?: string | undefined;
        targetElement?: null | undefined;
        bindHeightToTarget?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
