/** @typedef {typeof __propDef.props}  IndexProps */
/** @typedef {typeof __propDef.events}  IndexEvents */
/** @typedef {typeof __propDef.slots}  IndexSlots */
export default class Index extends SvelteComponentTyped<{
    animate?: boolean | undefined;
    open?: boolean | undefined;
    duration?: number | undefined;
    placement?: string | undefined;
    size?: null | undefined;
    zIndex?: number | undefined;
    height?: null | undefined;
    width?: null | undefined;
    left?: null | undefined;
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
        animate?: boolean | undefined;
        open?: boolean | undefined;
        duration?: number | undefined;
        placement?: string | undefined;
        size?: null | undefined;
        zIndex?: number | undefined;
        height?: null | undefined;
        width?: null | undefined;
        left?: null | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
