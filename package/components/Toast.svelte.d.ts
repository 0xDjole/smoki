import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        message: string;
        type?: "success" | "error" | "warning" | "info" | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ToastProps = typeof __propDef.props;
export type ToastEvents = typeof __propDef.events;
export type ToastSlots = typeof __propDef.slots;
export default class Toast extends SvelteComponentTyped<ToastProps, ToastEvents, ToastSlots> {
}
export {};
