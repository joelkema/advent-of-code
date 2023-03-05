import { not } from "../logic";
import { Maybe } from "./types";

const isNothing = <T>(value: T) => value === null || typeof value === "undefined";
const isJust = not(isNothing);

const maybeFactory = <A>(value: A): Maybe<A> => LocalMaybe(value);
const of = maybeFactory;

const LocalMaybe = <A>(value: A): Maybe<A> => {
    const map = <B>(fn: (t: A) => B): Maybe<B> | Maybe<null> => (isJust(value) ? of(fn(value)) : of(null));

    const bind = <B>(f: (t: A) => Maybe<B>) => (isJust(value) ? f(value) : of(null));

    return {
        $value: value,
        bind,
        chain: bind,
        emit: () => value,
        map,
        toString: () => (isJust(value) ? `Just(${value})` : "Nothing"),
    };
};

const exportMaybe = {
    of,
};

export { exportMaybe as Maybe };
