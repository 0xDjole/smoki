import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: any;
        placeholder: any;
    };
    events: {
        searching: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
export default class Index extends SvelteComponentTyped<IndexProps, IndexEvents, IndexSlots> {
}
export {};
