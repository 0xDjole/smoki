import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value?: null | undefined;
        options?: any[] | undefined;
        label?: string | undefined;
        errors?: any[] | undefined;
        className?: string | undefined;
        ui?: string | undefined;
        isMultiSelect?: boolean | undefined;
    };
    events: {
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
