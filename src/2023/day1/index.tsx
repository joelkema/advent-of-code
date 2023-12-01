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

// const slidingWindow = (array: string[], size: number) => {
//     if (size > array.length) return null;

//     const result = [];
//     for (let i = 0; i < array.length - size + 1; i++) {
//         result.push(array.slice(i, i + size));
//     }

//     return result;
// };

// slidingWindow("eightwonine".split(""), 5);

// replace first word with a number
// replace last word with a number
// so eightwonine becomes 829
const mapWordsToNumbers = (sentence: string) => {
    sentence = "28gtbkszmrtmnineoneightmx";

    const regex = new RegExp(/(?=(zero|one|two|three|four|five|six|seven|eight|nine))/, "g");

    // positive lookahead assertion for overlapping matches

    const matches = sentence.matchAll(regex);

    debugger;

    debugger;
    let output = sentence;
    // if (matches.length === 0) return output;
    // if (matches.length === 1) return output.replace(matches[0], numberTable[matches[0]].toString());

    // console.log(matches);

    // // replace first
    // output = output.replace(matches[0], numberTable[matches[0]].toString());
    // // replace last
    // output = output.replace(matches[matches.length - 1], numberTable[matches[matches.length - 1]].toString());

    return output;
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
                tap,
                mapWordsToNumbers,
                // tap,
                (s) => s.split(""),
                A.map(Number),
                A.filter(isNumber),
                // tap,
                // get first and last number
                (nums: number[]) => [nums[0], nums[nums.length - 1]],
                tap,
                (nums: number[]) => nums.join(""),
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
