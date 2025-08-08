import { LinkedList } from "../core";

import { ICallbackFn, ICallbackFnArguments, ISendAction } from "./types";

export class Transport {
    protected listeners: Map<string, any>;

    public constructor() {
        this.listeners = new Map();
    }

    public addListener = <T>(
        listenerName: ISendAction,
        callback: ICallbackFn<T>,
    ) => {
        if (this.listeners.has(listenerName)) {
            const linkedList = this.listeners.get(listenerName);

            linkedList.add(callback);
        } else {
            const linkedList = new LinkedList();

            linkedList.add(callback);

            this.listeners.set(listenerName, linkedList);
        }
    };

    public removeListener = <T>(
        listenerName: ISendAction,
        callback: ICallbackFn<T>,
    ) => {
        if (this.listeners.has(listenerName)) {
            const linkedList = this.listeners.get(listenerName);

            linkedList.remove(callback);
        }
    };

    public sendMessage = <T>(data: ICallbackFnArguments<T>) => {
        if (this.listeners.has(data.action)) {
            const linkedList = this.listeners.get(data.action);

            let cursor = linkedList.head;

            while (cursor) {
                if (typeof cursor.value === "function") {
                    cursor.value(data);
                }

                cursor = cursor.next;
            }
        }
    };

    public once = <T>(listenerName: ISendAction, callback: ICallbackFn<T>) => {
        const wrapper = (data: ICallbackFnArguments<T>) => {
            callback(data);

            this.listeners.delete(listenerName);
        };

        this.addListener(listenerName, wrapper);
    };
}
