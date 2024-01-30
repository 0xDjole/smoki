import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        viewDate: any;
        onSelect: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type DayItemProps = typeof __propDef.props;
export type DayItemEvents = typeof __propDef.events;
export type DayItemSlots = typeof __propDef.slots;
export default class DayItem extends SvelteComponentTyped<DayItemProps, DayItemEvents, DayItemSlots> {
}
export {};
