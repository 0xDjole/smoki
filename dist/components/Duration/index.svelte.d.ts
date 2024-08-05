import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        confirmText?: string | undefined;
        label?: string | undefined;
        value: any;
        onConfirm?: (() => void) | undefined;
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
