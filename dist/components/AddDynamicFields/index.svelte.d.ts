import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        label?: string | undefined;
        fields: any;
        autofillOptions?: any[] | undefined;
        addEntity?: (() => void) | undefined;
        t: any;
        field: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        entities: {
            value: any;
        };
    };
};
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
export default class Index extends SvelteComponentTyped<IndexProps, IndexEvents, IndexSlots> {
}
export {};
