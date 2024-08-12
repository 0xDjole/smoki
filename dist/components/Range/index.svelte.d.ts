/** @typedef {typeof __propDef.props}  IndexProps */
/** @typedef {typeof __propDef.events}  IndexEvents */
/** @typedef {typeof __propDef.slots}  IndexSlots */
export default class Index extends SvelteComponentTyped<{
    t: any;
    labelThumbnail: any;
    max?: number | undefined;
    id?: null | undefined;
    min?: number | undefined;
    value?: number | undefined;
    label?: string | undefined;
    isRequired?: boolean | undefined;
    errors?: any[] | undefined;
    onChange?: ((value: any) => void) | undefined;
    theme?: null | undefined;
    initialValue?: number | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        t: any;
        labelThumbnail: any;
        max?: number | undefined;
        id?: null | undefined;
        min?: number | undefined;
        value?: number | undefined;
        label?: string | undefined;
        isRequired?: boolean | undefined;
        errors?: any[] | undefined;
        onChange?: ((value: any) => void) | undefined;
        theme?: null | undefined;
        initialValue?: number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
