import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        onSelect: any;
        selectedValues?: any[] | undefined;
        availableValues?: null | undefined;
        betweenValues?: any[] | undefined;
        locale?: string | undefined;
        month: any;
        year: any;
    };
    events: {
        changedDate: CustomEvent<any>;
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
