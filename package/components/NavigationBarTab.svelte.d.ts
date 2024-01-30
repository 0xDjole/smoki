/** @typedef {typeof __propDef.props}  NavigationBarTabProps */
/** @typedef {typeof __propDef.events}  NavigationBarTabEvents */
/** @typedef {typeof __propDef.slots}  NavigationBarTabSlots */
export default class NavigationBarTab extends SvelteComponentTyped<{
    i: any;
    handleClick: any;
    isActive?: boolean | undefined;
    tab?: {} | undefined;
    tabLength?: number | undefined;
    navbar?: {} | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type NavigationBarTabProps = typeof __propDef.props;
export type NavigationBarTabEvents = typeof __propDef.events;
export type NavigationBarTabSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        i: any;
        handleClick: any;
        isActive?: boolean | undefined;
        tab?: {} | undefined;
        tabLength?: number | undefined;
        navbar?: {} | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
