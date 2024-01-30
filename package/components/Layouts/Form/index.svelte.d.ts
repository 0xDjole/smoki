import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        headerTitle?: string | undefined;
        headerAction?: null | undefined;
        headerActionName?: string | undefined;
        confirmHeaderMessage?: string | undefined;
        bottomActionName: any;
        bottomAction: any;
        isLoading?: boolean | undefined;
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
