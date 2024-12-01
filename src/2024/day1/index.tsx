import { pipe } from "fp-ts/function";
import * as A from "fp-ts/Array";
import { isNumber } from "../../shared/predicates";
import { split } from "../../utils/string";
import { input } from "./input";
import { sortNumeric, sum } from "../../utils";

const getLines = (i: string) =>
    pipe(
        i,
        split(/\n/),
        (a) => a.filter((s) => !!s),
        (a) => a.map(split("   ")),
    );

const assignment1 = () => {
    const lines = getLines(input);
    const leftColumn = sortNumeric(
        lines.map((l) => Number(l[0])),
        "asc",
    );
    const rightColumn = sortNumeric(
        lines.map((l) => Number(l[1])),
        "asc",
    );

    const distances = leftColumn.map((d, i) => {
        return d > rightColumn[i] ? d - rightColumn[i] : rightColumn[i] - d;
    });

    return sum(distances);
};

const assignment2 = () => {
    const lines = getLines(input);
    const leftColumn = sortNumeric(
        lines.map((l) => Number(l[0])),
        "asc",
    );
    const rightColumn = sortNumeric(
        lines.map((l) => Number(l[1])),
        "asc",
    );

    const similarity = leftColumn.map((d) => {
        const amountInOtherColumn = rightColumn.filter((r) => r === d)?.length || 0;
        return d * amountInOtherColumn;
    });

    return sum(similarity);
};

const Day = () => (
    <main>
        <h2>Day 1 </h2>
        <p> Part one: {assignment1()} </p>
        <p> Part one: {assignment2()} </p>
    </main>
);

export default Day;
