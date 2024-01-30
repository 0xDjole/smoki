/** @typedef {typeof __propDef.props}  NavigationBarProps */
/** @typedef {typeof __propDef.events}  NavigationBarEvents */
/** @typedef {typeof __propDef.slots}  NavigationBarSlots */
export default class NavigationBar extends SvelteComponentTyped<{
    navbar: any;
    handleClick: any;
    activeTabIndex: any;
    tabs?: any[] | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type NavigationBarProps = typeof __propDef.props;
export type NavigationBarEvents = typeof __propDef.events;
export type NavigationBarSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        navbar: any;
        handleClick: any;
        activeTabIndex: any;
        tabs?: any[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
