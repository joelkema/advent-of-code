import compose from ".";
import { expect, test } from "vitest";

const toUpperCase = (x: string) => x.toUpperCase();
const exclaim = (x: string) => `${x}!`;
const shout = compose(exclaim, toUpperCase);

test("the functions are correctly composed", () => expect(shout("send in the clowns")).toEqual("SEND IN THE CLOWNS!"));
