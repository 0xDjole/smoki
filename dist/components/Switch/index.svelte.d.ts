import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value?: boolean | undefined;
        color?: string | undefined;
        label?: string | undefined;
        labelThumbnail?: null | undefined;
        errors?: any[] | undefined;
        t: any;
        isRequired?: boolean | undefined;
        onChange?: ((isChecked: any) => void) | undefined;
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
