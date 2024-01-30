import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        title: any;
        showBack: any;
        navigationPath: any;
        showHeader?: boolean | undefined;
        headerClass: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        back: {};
        default: {};
    };
};
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
export default class Index extends SvelteComponentTyped<IndexProps, IndexEvents, IndexSlots> {
}
export {};
