import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        text?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type FakeScreenProps = typeof __propDef.props;
export type FakeScreenEvents = typeof __propDef.events;
export type FakeScreenSlots = typeof __propDef.slots;
export default class FakeScreen extends SvelteComponentTyped<FakeScreenProps, FakeScreenEvents, FakeScreenSlots> {
}
export {};
