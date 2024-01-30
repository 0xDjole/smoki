import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: any;
        suggestionOpened?: boolean | undefined;
        suggestionItems?: any[] | undefined;
        onSearch?: (() => void) | undefined;
        onClickItem?: (() => void) | undefined;
    };
    events: {
        searching: CustomEvent<any>;
        search: CustomEvent<any>;
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
