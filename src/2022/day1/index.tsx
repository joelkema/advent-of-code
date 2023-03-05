import { pipe } from "../../shared/logic";
import { isDefined } from "../../shared/predicates";
import { sortNumeric, sum } from "../../utils";
import { filter, map, max, reduce, slice } from "../../utils/array";
import { split } from "../../utils/string";
import { input } from "./input";

// split by double enter
const splitByDoubleEnter = split(/\n\s*\n/);

const splitted = splitByDoubleEnter(input);

const getCalories = (accumulator: number[], line: string) => {
    const summed = pipe(
        line,
        split(/\n/),
        filter<string>(isDefined),
        map((a) => parseInt(a, 10)),
        sum,
    );

    accumulator.push(summed);

    return accumulator;
};

console.log(splitted.reduce(getCalories, []));

// split() -> string[]
// reduce()

export const arr = (a: number[]) => a[0];

const fp1 = pipe(input, splitByDoubleEnter, reduce(getCalories, []), max);

// const fp2 = pipe(input, splitByDoubleEnter, reduce(getCalories, []), sortNumeric, slice(0, 3), sum);

export const assignment1 = () => Math.max(...splitted.reduce(getCalories, []));

export const assignment2 = () => sum(sortNumeric(splitted.reduce(getCalories, [])).slice(0, 3));

const Day = () => (
    <main>
        <h2>Day 1</h2>
        <p>Part one: {assignment1()}</p>
        <p>Part one: {fp1}</p>
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
