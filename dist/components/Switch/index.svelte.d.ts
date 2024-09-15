/** @typedef {typeof __propDef.props}  IndexProps */
/** @typedef {typeof __propDef.events}  IndexEvents */
/** @typedef {typeof __propDef.slots}  IndexSlots */
export default class Index extends SvelteComponentTyped<{
    t: any;
    color?: string | undefined;
    value?: boolean | undefined;
    label?: string | undefined;
    isRequired?: boolean | undefined;
    onChange?: ((isChecked: any) => void) | undefined;
    labelThumbnail?: null | undefined;
    errors?: any[] | undefined;
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
        color?: string | undefined;
        value?: boolean | undefined;
        label?: string | undefined;
        isRequired?: boolean | undefined;
        onChange?: ((isChecked: any) => void) | undefined;
        labelThumbnail?: null | undefined;
        errors?: any[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
