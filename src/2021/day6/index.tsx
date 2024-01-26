import { pipe } from "fp-ts/function";
import * as A from "fp-ts/Array";
import { isNumber } from "../../shared/predicates";
import { split } from "../../utils/string";
import { input } from "./input";
import { removeWhitespaces, sum } from "../../utils";

// https://adventofcode.com/2021/day/6
const assignment = (days: number) => {
    let parsedInput = input.split(",").map(Number);

    let lanternfishes: Record<number, number> = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
    };

    Object.keys(lanternfishes).forEach((key) => {
        lanternfishes[Number(key)] = parsedInput.filter((p) => p === Number(key)).length;
    });

    for (let day = 0; day < days; day++) {
        let newLanternfishes: Record<number, number> = {};

        for (let i = 0; i <= 8; i++) {
            if (!lanternfishes[i]) continue;

            if (i === 0) {
                newLanternfishes[6] = lanternfishes[i];
                newLanternfishes[8] = newLanternfishes[8] ? newLanternfishes[8] + lanternfishes[i] : lanternfishes[i];
            } else {
                newLanternfishes[i - 1] = lanternfishes[i] + (newLanternfishes[i - 1] ? newLanternfishes[i - 1] : 0);
            }
        }
        lanternfishes = newLanternfishes;
    }

    console.log(lanternfishes);

    console.log(sum(Object.values(lanternfishes)));

    return sum(Object.values(lanternfishes));
};

const Day = () => (
    <main>
        <h2>Day 6</h2>
        <p>Part one: {assignment(80)}</p>
        <p>Part two: {assignment(256)}</p>
    </main>
);

export default Day;
