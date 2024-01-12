import { pipe } from "fp-ts/function";
import * as A from "fp-ts/Array";
import { isNumber } from "../../shared/predicates";
import { split } from "../../utils/string";
import { input } from "./input";
import { removeWhitespaces, sum } from "../../utils";

// https://adventofcode.com/2021/day/6
const assignment1 = () => {
    let lanternfishes = input.split(",").map(Number);
    const days = 80;

    for (let day = 0; day < days; day++) {
        let length = lanternfishes.length;
        for (let i = 0; i < length; i++) {
            // it was present at the start of the day
            if (i <= length) {
                lanternfishes[i] = lanternfishes[i] - 1;
            }

            // a 0 becomes a 6 and adds a new 8 to the end of the list
            if (lanternfishes[i] < 0) {
                lanternfishes[i] = 6;
                lanternfishes.push(8);
            }
        }
    }

    return lanternfishes.length;
};

// https://adventofcode.com/2021/day/6#part2
const assignment2 = () => {
    let lanternfishes = new Uint32Array(input.split(",").map(Number));

    const days = 50;

    for (let day = 0; day < days; day++) {
        let length = lanternfishes.length;
        for (let i = 0; i < length; i++) {
            // it was present at the start of the day
            if (i <= length) {
                lanternfishes[i] = lanternfishes[i] - 1;
            }

            // a 0 becomes a 6 and adds a new 8 to the end of the list
            if (lanternfishes[i] < 0) {
                lanternfishes[i] = 6;

                // lanternfishes[i + 1] = 8;

                // lanternfishes = new Uint32Array(lanternfishes.length + 1);
                // lanternfishes.set([...lanternfishes, 1]);
                debugger;
            }
        }

        console.log(`After ${day + 1} days:`, lanternfishes.join(","));
    }

    return lanternfishes.length;
};

const Day = () => (
    <main>
        <h2>Day 6</h2>
        <p>Part one: {assignment1()}</p>
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
