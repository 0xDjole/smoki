import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        min?: number | undefined;
        max?: number | undefined;
        initialValue?: number | undefined;
        id?: null | undefined;
        value?: number | undefined;
        theme?: null | undefined;
        label?: string | undefined;
        labelThumbnail: any;
        t: any;
        errors?: any[] | undefined;
        isRequired?: boolean | undefined;
        onChange?: ((value: any) => void) | undefined;
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
