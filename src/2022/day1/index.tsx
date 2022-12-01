import { isDefined, sortNumeric, sum } from "../../utils";
import { input } from "./input";

// split by double enter
const splitted = input.split(/\n\s*\n/);

const getCalories = (accumulator: number[], line: string) => {
    const numbers = line
        .split(/\n/)
        .filter(isDefined)
        .map((a) => parseInt(a, 10));

    accumulator.push(sum(numbers));

    return accumulator;
};

export const assignment1 = () => Math.max(...splitted.reduce(getCalories, []));

export const assignment2 = () => sum(sortNumeric(splitted.reduce(getCalories, [])).slice(0, 3));

const Day = () => (
    <main>
        <h2>Day 1</h2>
        <p>Part one: {assignment1()}</p>
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
