import { pipe } from "fp-ts/function";
import * as A from "fp-ts/Array";
import { isNumber } from "../../shared/predicates";
import { split } from "../../utils/string";
import { input } from "./input";
import { removeWhitespaces, sum } from "../../utils";
import { map } from "../../utils/array";

const tap = (a: any) => {
    console.log(a);
    return a;
};

const numberTable: Record<string, number> = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

// 0 = e
// 1 = i
// 2 = g
// 3 =

const slidingWindow = (array: string[], size: number) => {
    if (size > array.length) return null;

    const result = [];
    for (let i = 0; i < array.length - size + 1; i++) {
        result.push(array.slice(i, i + size));
    }
    debugger;

    return result;
};

slidingWindow("eightwonine".split(""), 5);

// replace each word with a number
// so eightwonine becomes 829
const mapWordsToNumbers = (sentence: string) => {
    let result = "";
    // let window = "";
    let start = 0;

    for (let i = start; i < sentence.length; i++) {
        const w = sentence.slice(start, i + 1);
        console.log(w);
        if (numberTable[w] !== undefined) {
            console.log("FOUND ONE!!");
            result += numberTable[w].toString();
            i += 2; // skip next two characters
        }
    }
    return result;
};

const assignment1 = () =>
    pipe(
        input,
        split(/\n/),
        A.map(removeWhitespaces),
        A.map((s: string) =>
            pipe(
                s.split(""),
                A.map(Number),
                A.filter(isNumber),
                // get first and last number
                (nums: number[]) => [nums[0], nums[nums.length - 1]],
                (nums: number[]) => nums.join(""),
            ),
        ),
        A.map(Number),
        sum,
    );

const assignment2 = () =>
    pipe(
        input,
        split(/\n/),
        A.map(removeWhitespaces),
        A.map((s: string) =>
            pipe(
                s,
                mapWordsToNumbers,
                // tap,
                // // get first and last number
                // (nums: number[]) => [nums[0], nums[nums.length - 1]],
                // (nums: number[]) => nums.join(""),
                // tap,
            ),
        ),
        A.map(Number),
        sum,
    );

const Day = () => (
    <main>
        <h2>Day 1</h2>
        <p>Part one: {assignment1()}</p>
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
