import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        showBack: boolean;
        title: string;
        showNavbar?: boolean | undefined;
        showHeader?: boolean | undefined;
        showList?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type LoaderWrapperProps = typeof __propDef.props;
export type LoaderWrapperEvents = typeof __propDef.events;
export type LoaderWrapperSlots = typeof __propDef.slots;
export default class LoaderWrapper extends SvelteComponentTyped<LoaderWrapperProps, LoaderWrapperEvents, LoaderWrapperSlots> {
}
export {};
