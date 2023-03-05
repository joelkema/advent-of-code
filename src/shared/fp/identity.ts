import { Monad } from "./types";

type Identity<A> = Monad<A>;

interface IdentityFactory {
    <A>(x: A): Identity<A>;
}

const Identity = <A>(x: A): Identity<A> => ({
    emit: () => x,
    bind: (f) => f(x),
    chain: (f) => f(x),
    map: (f) => of(f(x)),
    toString: () => `Identity(${x})`,
});

// you might do type-checking here
const of: IdentityFactory = (x) => Identity(x);

const exportOf = {
    of,
};

// or module.exports
export { exportOf as Identity };
