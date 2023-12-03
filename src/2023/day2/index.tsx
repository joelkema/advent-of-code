import { pipe } from "fp-ts/function";
import * as A from "fp-ts/Array";
import { split } from "../../utils/string";
import { input } from "./input";
import { sum } from "../../utils";
import { trim } from "fp-ts/lib/string";

type Game = {
    id: number;
    throws: {
        red: number;
        blue: number;
        green: number;
    }[];
    maxRed: number;
    maxBlue: number;
    maxGreen: number;
};

const bag = {
    red: 12,
    green: 13,
    blue: 14,
};

const getLines = (i: string) => pipe(i, split(/\n/), A.map(trim));

// accepts a string like "4 blue" and returns an array of 4 blue's
const getCubes = (input: string): string[] =>
    pipe(input.trim().split(" "), ([count, color]) => Array(parseInt(count)).fill(color));

const linesToGames = (lines: string[]) =>
    pipe(
        lines,
        A.map((line) => {
            const [game, output] = line.split(":");

            const throws = pipe(
                output.split(";"),
                A.map((s) => s.split(",").flatMap(getCubes)),
                A.map((t) => ({
                    red: pipe(
                        t,
                        A.filter((c: string) => c === "red"),
                        A.size,
                    ),
                    blue: pipe(
                        t,
                        A.filter((c: string) => c === "blue"),
                        A.size,
                    ),
                    green: pipe(
                        t,
                        A.filter((c: string) => c === "green"),
                        A.size,
                    ),
                })),
            );

            return {
                id: Number(game.replace("Game ", "")),
                throws,
                maxRed: pipe(
                    throws,
                    A.reduce(0, (acc, curr) => Math.max(acc, curr.red)),
                ),
                maxBlue: pipe(
                    throws,
                    A.reduce(0, (acc, curr) => Math.max(acc, curr.blue)),
                ),
                maxGreen: pipe(
                    throws,
                    A.reduce(0, (acc, curr) => Math.max(acc, curr.green)),
                ),
            };
        }),
    );

const assignment1 = () => {
    const lines = getLines(input);
    const games: Game[] = linesToGames(lines);

    // get possible games
    const possibleGames = games.filter((g) => {
        return g.throws.every((t) => {
            const { red, blue, green } = t;

            if (red > bag.red || blue > bag.blue || green > bag.green) {
                return false;
            }

            return true;
        });
    });

    return sum(possibleGames.map((g) => g.id));
};

const assignment2 = () => {
    const lines = getLines(input);
    const games: Game[] = linesToGames(lines);

    return sum(
        games.map((g) => {
            const { maxRed, maxBlue, maxGreen } = g;

            return maxRed * maxBlue * maxGreen;
        }),
    );
};

const Day = () => (
    <main>
        <h2>Day 2</h2>
        <p>Part one: {assignment1()}</p>
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
