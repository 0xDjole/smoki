import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        label?: string | undefined;
        errors?: any[] | undefined;
        range: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type RangeProps = typeof __propDef.props;
export type RangeEvents = typeof __propDef.events;
export type RangeSlots = typeof __propDef.slots;
export default class Range extends SvelteComponentTyped<RangeProps, RangeEvents, RangeSlots> {
}
export {};
