// https://stackoverflow.com/questions/63903982/how-to-write-curry-and-compose-in-typescript-4

export type Curried<A extends any[], R> = <P extends Partial<A>>(
    ...args: P
) => P extends A ? R : A extends [...SameLength<P>, ...infer S] ? (S extends any[] ? Curried<S, R> : never) : never;

type SameLength<T extends any[]> = Extract<{ [K in keyof T]: any }, any[]>;

export default function curry<A extends any[], R>(fn: (...args: A) => R): Curried<A, R> {
    return (...args: any[]): any =>
        args.length >= fn.length ? fn(...(args as any)) : curry((fn as any).bind(undefined, ...args));
}
