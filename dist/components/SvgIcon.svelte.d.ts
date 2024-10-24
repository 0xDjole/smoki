import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        data?: string | undefined;
        viewBox?: string | undefined;
        size?: string | undefined;
        width?: string | undefined;
        height?: string | undefined;
        color?: string | undefined;
        stroke?: string | undefined;
        fill?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SvgIconProps = typeof __propDef.props;
export type SvgIconEvents = typeof __propDef.events;
export type SvgIconSlots = typeof __propDef.slots;
export default class SvgIcon extends SvelteComponentTyped<SvgIconProps, SvgIconEvents, SvgIconSlots> {
}
export {};
