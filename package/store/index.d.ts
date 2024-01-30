import type { Navigate } from '../types';
export declare const navigation: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<Navigate>, invalidate?: ((value?: Navigate | undefined) => void) | undefined) => import("svelte/store").Unsubscriber;
    back: () => void;
    getSearchParam: (param: any) => string | null;
    init: (screens: any, navigationType: any, urlObject: any, navigationPath: any, defaultIndex: any) => void;
    navigate: (url: any, { reload }?: {
        reload: boolean;
    }, callback?: () => void) => void;
    loadUp: () => void;
} | null;
