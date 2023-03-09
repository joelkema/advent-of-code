import { Monad } from "./types";

type Identity<A> = Monad<A>;

interface IdentityFactory {
    <A>(x: A): Identity<A>;
}

const LocalIdentity = <A>(x: A): Identity<A> => ({
    emit: () => x,
    bind: (f) => f(x),
    chain: (f) => f(x),
    map: (f) => of(f(x)),
    toString: () => `Identity(${x})`,
});

// you might do type-checking here
const of: IdentityFactory = (x) => LocalIdentity(x);

const exportOf = {
    of,
};

// or module.exports
export { exportOf as Identity };
