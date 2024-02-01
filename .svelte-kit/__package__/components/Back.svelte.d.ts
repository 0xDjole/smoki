import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type BackProps = typeof __propDef.props;
export type BackEvents = typeof __propDef.events;
export type BackSlots = typeof __propDef.slots;
export default class Back extends SvelteComponentTyped<BackProps, BackEvents, BackSlots> {
}
export {};
