import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        label?: string | undefined;
        value: any;
        errors?: any[] | undefined;
        fieldType: any;
        addEntity?: (() => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PropertiesProps = typeof __propDef.props;
export type PropertiesEvents = typeof __propDef.events;
export type PropertiesSlots = typeof __propDef.slots;
export default class Properties extends SvelteComponentTyped<PropertiesProps, PropertiesEvents, PropertiesSlots> {
}
export {};
