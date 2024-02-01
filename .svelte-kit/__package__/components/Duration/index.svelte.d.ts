import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        confirmText?: string | undefined;
        label?: string | undefined;
        value: any;
    };
    events: {
        confirm: CustomEvent<any>;
    } & {
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
