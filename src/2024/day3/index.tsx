import { pipe } from "fp-ts/function";
import * as A from "fp-ts/Array";
import { split } from "../../utils/string";

const getLines = (i: string) =>
    pipe(
        i,
        split(/\n/),
        A.filter((s) => !!s),
        A.map(split(" ")),
        A.map(A.map(Number)),
    );

const assignment1 = () => {};

const Day = () => (
    <main>
        <h2>Day 2 </h2>
        <p> Part one: {assignment1()} </p>
        {/* <p> Part two: {assignment2()} </p> */}
    </main>
);

export default Day;
