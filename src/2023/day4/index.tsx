import { pipe } from "fp-ts/lib/function";
import { split } from "../../utils/string";
import { removeWhitespaces, sum } from "../../utils";
import * as A from "fp-ts/Array";
import { input } from "./input";
import { intersection, isNumber } from "lodash";

const getLines = (i: string) => pipe(i, split(/\n/));

const assignment1 = () => {
    const cards = getLines(input).map((line) =>
        line
            .replace(/Card [1-9]:/, "")
            .split(" | ")
            .map((card) => card.split(" "))
            .map((c) => c.filter((x) => !!x).map(Number)),
    );

    const points = cards.map((card) => {
        const [winningNumbers, yourNumbers] = card;

        const sameNumbers = intersection(winningNumbers, yourNumbers);

        if (sameNumbers.length === 0) return 0;

        console.log(sameNumbers.length);

        return sameNumbers.length === 1 ? 1 : Math.pow(2, sameNumbers.length - 1);
    });

    return sum(points);
};

const assignment2 = () => {
    return 0;
};

const Day = () => (
    <main>
        <h2>Day 4</h2>
        <p>Part one: {assignment1()}</p>
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
