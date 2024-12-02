import { pipe } from "effect";
import { split } from "../../utils/string";
import { input } from "./input";

import * as A from "effect/Array";
import { removeWhitespaces, sumProduct } from "../../utils";
import { get } from "lodash";

type Race = {
    lasts: number;
    distance: number;
};

const getLines = (i: string) => pipe(i, split(/\n/));

const parseLineWithSpaces = (line: string): number[] =>
    line
        .split(":")[1]
        .split(" ")
        .filter((s) => !!s)
        .map(Number);

const parseLineWithoutSpaces = (line: string) =>
    pipe(
        line,
        (s) => s.split(":")[1],
        removeWhitespaces,
        (s) => Number(s),
    );

const distancePerMilliseconds = 1;

const calculateWin = (race: Race) => {
    // create array of all possible options
    // start is 0 and end is equal to race.lasts
    const options = Array.from(Array(race.lasts + 1).keys());

    const traveled = options.map(
        (buttonHoldingInMs) => (race.lasts - buttonHoldingInMs) * (buttonHoldingInMs * distancePerMilliseconds),
    );

    return traveled.filter((t) => t > race.distance);
};

const assignment1 = () =>
    pipe(
        getLines(input),
        (lines) => ({
            timeLine: parseLineWithSpaces(get(lines, 0)),
            distanceLine: parseLineWithSpaces(get(lines, 1)),
        }),
        (obj) => obj.timeLine.map((time, i) => ({ lasts: time, distance: obj.distanceLine[i] })),
        A.map(calculateWin),
        A.map((w) => w.length),
        sumProduct,
    );

const assignment2 = () =>
    pipe(
        getLines(input),
        (lines) => ({
            lasts: parseLineWithoutSpaces(get(lines, 0)),
            distance: parseLineWithoutSpaces(get(lines, 1)),
        }),
        calculateWin,
        A.size,
    );

const Day = () => (
    <main>
        <h2>Day 6</h2>
        <p>Part one: {assignment1()}</p>
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
