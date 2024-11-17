import { pipe } from "fp-ts/function";
import * as A from "fp-ts/Array";
import { split } from "../../utils/string";
import { input } from "./input";
import { removeWhitespaces, sum } from "../../utils";

const calculateSquareFeet = (l: number, w: number, h: number) => {
    const sides = [l * w, w * h, h * l];
    return 2 * sides.reduce((acc, v) => acc + v, 0) + Math.min(...sides);
};

const getLines = (i: string) => pipe(i, split(/\n/), A.map(removeWhitespaces)).filter((s) => !!s);

const getLineSquareFeet = (s: string) => pipe(s.split("x"), A.map(Number), ([l, w, h]) => calculateSquareFeet(l, w, h));

const calculateFeetOfRibbon = (s: string) => {
    const [l, w, h] = s.split("x").map(Number);
    const [smallest, secondSmallest] = [l, w, h].sort((a, b) => a - b);
    return 2 * (smallest + secondSmallest) + l * w * h;
};

const assignment1 = pipe(input, getLines, A.map(getLineSquareFeet), sum);

const assignment2 = pipe(input, getLines, A.map(calculateFeetOfRibbon), sum);

const Day = () => (
    <main>
        <h2>Day 1</h2>
        <p>Part one: {assignment1}</p>
        <p>Part two: {assignment2}</p>
    </main>
);

export default Day;
