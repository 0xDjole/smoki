import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        label?: string | undefined;
        options?: any[] | undefined;
        errors?: any[] | undefined;
        type?: string | undefined;
        t: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type OptionsProps = typeof __propDef.props;
export type OptionsEvents = typeof __propDef.events;
export type OptionsSlots = typeof __propDef.slots;
export default class Options extends SvelteComponentTyped<OptionsProps, OptionsEvents, OptionsSlots> {
}
export {};
