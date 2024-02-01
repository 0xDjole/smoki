/** @typedef {typeof __propDef.props}  SvgIconProps */
/** @typedef {typeof __propDef.events}  SvgIconEvents */
/** @typedef {typeof __propDef.slots}  SvgIconSlots */
export default class SvgIcon extends SvelteComponentTyped<{
    [x: string]: any;
    fill?: string | undefined;
    stroke?: string | undefined;
    data?: string | undefined;
    height?: string | undefined;
    width?: string | undefined;
    color?: string | undefined;
    size?: string | undefined;
    viewBox?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type SvgIconProps = typeof __propDef.props;
export type SvgIconEvents = typeof __propDef.events;
export type SvgIconSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        fill?: string | undefined;
        stroke?: string | undefined;
        data?: string | undefined;
        height?: string | undefined;
        width?: string | undefined;
        color?: string | undefined;
        size?: string | undefined;
        viewBox?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
