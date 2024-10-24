import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        showBorder?: boolean | undefined;
        sticky?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        left: {};
        middle: {};
        right: {};
    };
};
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
export default class Index extends SvelteComponentTyped<IndexProps, IndexEvents, IndexSlots> {
}
export {};
