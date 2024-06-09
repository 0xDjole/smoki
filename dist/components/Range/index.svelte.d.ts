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
    errors?: any[] | undefined;
    initialValue?: number | undefined;
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
        t: any;
        labelThumbnail: any;
        max?: number | undefined;
        id?: null | undefined;
        min?: number | undefined;
        value?: number | undefined;
        label?: string | undefined;
        errors?: any[] | undefined;
        initialValue?: number | undefined;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
