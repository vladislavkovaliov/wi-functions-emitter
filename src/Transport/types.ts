export interface SendActionMap {
    LOG: true;
    ERROR: true;
}

export type ISendAction = keyof SendActionMap;

export interface ICallbackFnArguments<T> {
    action: ISendAction;
    data: T;
}

export type ICallbackFn<T> = ({
    action,
    data,
}: ICallbackFnArguments<T>) => void;

export type ILogTransport = any;
