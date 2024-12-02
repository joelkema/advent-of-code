import { pipe } from "effect";
import { split } from "../../utils/string";
import { removeWhitespaces } from "../../utils";
import * as A from "effect/Array";
import { input } from "./input";

const getLines = (i: string) => pipe(i, split(/\n/), A.map(removeWhitespaces));

const assignment1 = () => {
    const lines = getLines(input);
    const lineLength = lines[0].length;

    const dots = lines.map((line) => {
        return line.split(".");
    }, []);

    console.log(dots);

    const grid: string[][] = [];

    for (let i = 0; i < lines.length; i++) {
        if (!grid[i]) grid[i] = [];

        for (let j = 0; j < lineLength; j++) {
            grid[i][j] = lines[i][j];

            if (Number(dots[i][j])) {
                grid[i][j] = dots[i][j];
            }
            if (dots[i][j] === "" && Number(grid[i][j - 1])) {
                console.log("JASJ");
            }
            console.log(dots[i][j]);
        }

        // const line = lines[i];

        // const dots = line.split(".");

        // const numbers = row.filter(isNumber).map(Number);
    }

    return 0;
};

const assignment2 = () => {
    return 0;
};

const Day = () => (
    <main>
        <h2>Day 3</h2>
        <p>Part one: {assignment1()}</p>
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
