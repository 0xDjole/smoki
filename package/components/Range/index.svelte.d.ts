/** @typedef {typeof __propDef.props}  IndexProps */
/** @typedef {typeof __propDef.events}  IndexEvents */
/** @typedef {typeof __propDef.slots}  IndexSlots */
export default class Index extends SvelteComponentTyped<{
    label?: string | undefined;
    value?: number | undefined;
    errors?: any[] | undefined;
    min?: number | undefined;
    max?: number | undefined;
    initialValue?: number | undefined;
    id?: null | undefined;
}, {
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        label?: string | undefined;
        value?: number | undefined;
        errors?: any[] | undefined;
        min?: number | undefined;
        max?: number | undefined;
        initialValue?: number | undefined;
        id?: null | undefined;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
