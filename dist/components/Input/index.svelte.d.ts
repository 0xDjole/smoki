import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        kind: any;
        onChange?: ((value: any) => void) | undefined;
        placeholder: any;
        accept?: string | undefined;
        value: any;
        type?: string | undefined;
        style?: string | undefined;
        errors?: any[] | undefined;
        label?: string | undefined;
        labelThumbnail: any;
        t: any;
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
