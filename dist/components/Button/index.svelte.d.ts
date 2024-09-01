import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        kind?: string | undefined;
        size?: string | undefined;
        position?: string | undefined;
        onClick?: (() => void) | undefined;
        style?: string | undefined;
        disabled?: boolean | undefined;
        className?: string | undefined;
        stopPropagation?: boolean | undefined;
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
