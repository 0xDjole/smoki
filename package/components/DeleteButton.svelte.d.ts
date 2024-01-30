import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        onClick?: (() => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type DeleteButtonProps = typeof __propDef.props;
export type DeleteButtonEvents = typeof __propDef.events;
export type DeleteButtonSlots = typeof __propDef.slots;
export default class DeleteButton extends SvelteComponentTyped<DeleteButtonProps, DeleteButtonEvents, DeleteButtonSlots> {
}
export {};
