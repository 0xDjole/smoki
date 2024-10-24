import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        title?: string | undefined;
        showModal: any;
        height?: string | undefined;
        top?: string | undefined;
        zIndex?: number | undefined;
        confirmText?: null | undefined;
        modalStyle?: string | undefined;
        confirm?: (() => void) | undefined;
        disabled?: boolean | undefined;
        onCancel: any;
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
