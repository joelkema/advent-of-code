import { pipe } from "fp-ts/function";
import * as A from "fp-ts/Array";
import { isNumber } from "../../shared/predicates";
import { split } from "../../utils/string";
import { input } from "./input";
import { removeWhitespaces, sum } from "../../utils";

// this seems like a strange mapping,
// however this makes it so that eightwo becomes e8ight2wo
// which is easier to map to numbers
// else we would get 8wo
const numberTable: Record<string, string> = {
    one: "o1ne",
    two: "t2wo",
    three: "t3hree",
    four: "f4our",
    five: "f5ive",
    six: "s6ix",
    seven: "s7even",
    eight: "e8ight",
    nine: "n9ine",
};

// so eightwonine becomes 829
const mapWordsToNumbers = (sentence: string) => {
    let output = sentence;

    Object.keys(numberTable).forEach((key) => {
        output = output.replaceAll(key, numberTable[key]);
    });

    return output;
};

const getLines = (i: string) => pipe(i, split(/\n/), A.map(removeWhitespaces));

const assignment1 = () =>
    pipe(
        getLines(input),
        A.map((s: string) =>
            pipe(
                s.split(""),
                // map strings to numbers
                A.map(Number),
                // filter out NaN
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
        getLines(input),
        A.map((s: string) =>
            pipe(
                s,
                mapWordsToNumbers,
                (s) => s.split(""),
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

const Day = () => (
    <main>
        <h2>Day 1</h2>
        <p>Part one: {assignment1()}</p>
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
