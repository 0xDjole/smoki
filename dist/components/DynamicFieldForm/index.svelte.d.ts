import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        label?: string | undefined;
        fieldConfigs?: any[] | undefined;
        fields?: any[] | undefined;
        locale?: string | undefined;
        t: any;
        theme?: null | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        entities: {
            idx: any;
            value: any;
            fieldConfig: any;
        };
        custom: {
            idx: any;
            errors: any;
            value: any;
            fieldConfig: any;
        };
    };
};
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
export default class Index extends SvelteComponentTyped<IndexProps, IndexEvents, IndexSlots> {
}
export {};
