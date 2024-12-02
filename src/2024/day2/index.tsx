import { pipe } from "fp-ts/function";
import * as A from "fp-ts/Array";
import { split } from "../../utils/string";
import { input } from "./input";

const getLines = (i: string) =>
    pipe(
        i,
        split(/\n/),
        A.filter((s) => !!s),
        A.map(split(" ")),
        A.map(A.map(Number)),
    );

const levelsAreInOrder = (levels: number[]) => {
    const allAreIncreasing = levels.every((l, i) => {
        if (i === levels.length - 1) return true;
        return l > levels[i + 1];
    });

    const allAreDecreasing = levels.every((l, i) => {
        if (i === levels.length - 1) return true;
        return l < levels[i + 1];
    });

    return allAreIncreasing || allAreDecreasing;
};

const maxDiffer = (levels: number[]) => {
    // adjacent levels differ by at least one at most 3
    const diffs = levels.every((l, i) => {
        if (i === levels.length - 1) return true;

        const adjacent = levels[i + 1];

        return adjacent > l ? adjacent - l <= 3 : l - adjacent <= 3;
    });

    return diffs;
};

const isSafe = (levels: number[]) => maxDiffer(levels) && levelsAreInOrder(levels);

const problemDampening = (levels: number[]) => {
    // check if by removing a false character the levels are in order
    const dampened = levels.some((l, i) => {
        const copy = [...levels];
        copy.splice(i, 1);

        return isSafe(copy);
    });

    return dampened;
};

const assignment1 = () => {
    const lines = getLines(input);

    const safeLevels = lines.filter(isSafe);

    return safeLevels.length;
};

const assignment2 = () => {
    const lines = getLines(input);

    const safeLevels = lines.filter(problemDampening);

    return safeLevels.length;
};

const Day = () => (
    <main>
        <h2>Day 2 </h2>
        <p> Part one: {assignment1()} </p>
        <p> Part two: {assignment2()} </p>
    </main>
);

export default Day;
