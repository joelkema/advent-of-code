import { Maybe } from "./maybe";
import { compose } from "../logic";
import curry from "../logic/curry";

// type User = { pet: Pet };
// type Pet = { nickname: string };

// const getCurrentUser = (): User | undefined => (Math.random() === 1 ? { pet: { nickname: "abc" } } : undefined);

// const getPet = (user: User): Pet | undefined => (Math.random() === 1 ? user.pet : undefined);

// const getNickname = (pet: Pet): string | undefined => (Math.random() === 1 ? pet.nickname : undefined);

// export const getPetNickName = () => {
//     const user = getCurrentUser();
//     if (user === undefined) {
//         return undefined;
//     }

//     const pet = getPet(user);
//     if (pet === undefined) {
//         return undefined;
//     }

//     return getNickname(pet);
// };

// export const getPetNickNameFn = () => Maybe.of(getCurrentUser()).map(getPet);

// map :: Functor f => (a -> b) -> f a -> f b
const map = curry((f, anyFunctor) => anyFunctor.map(f));

const prop = curry((p, obj) => obj[p]);

// safeHead :: [a] -> Maybe(a)
const safeHead = <T>(xs: T[]) => Maybe.of(xs[0]);

// getStreetName :: Object -> Maybe String
const getStreetName = compose(map(prop("street")), safeHead, prop("addresses"));

test("should return Just(1) when passing 1", () => {
    const value = Maybe.of(1);

    expect(value.toString()).toBe("Just(1)");
});

test.each([null, undefined])("should return Nothing when passing %s", (value) =>
    expect(Maybe.of(value).toString()).toBe("Nothing"),
);

test("should return Nothing when addresses is an empty array", () => {
    const value = getStreetName({ addresses: [] });

    expect(value.toString()).toBe("Nothing");
});

test("abc", () => {
    const value = getStreetName({ addresses: [{ street: "Shady Ln.", number: 4201 }] });

    expect(value.toString()).toBe("Just(Shady Ln.)");
});
