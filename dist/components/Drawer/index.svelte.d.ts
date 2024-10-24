import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        open?: boolean | undefined;
        duration?: number | undefined;
        placement?: string | undefined;
        size?: null | undefined;
        zIndex?: number | undefined;
        height?: null | undefined;
        width?: null | undefined;
        left?: null | undefined;
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
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
export default class Index extends SvelteComponentTyped<IndexProps, IndexEvents, IndexSlots> {
}
export {};
