import { input } from "./input";

type Entry = {
    signalPatterns: string[];
    outputValue: string[];
};

const segments: Record<string, number> = {
    abcefg: 0,
    cf: 1,
    acdeg: 2,
    acdfg: 3,
    bcdf: 4,
    abdfg: 5,
    abdefg: 6,
    acf: 7,
    abcdefg: 8,
};

const entries = input.reduce((map: Entry[], row: string) => {
    const splittedRow = row.split(" | ");
    const signalPatterns = splittedRow[0].split(" ");
    const outputValue = splittedRow[1].split(" ");

    map.push({ signalPatterns, outputValue });

    return map;
}, []);

// https://adventofcode.com/2021/day/8
export const assignment1 = () =>
    entries.flatMap((a) => a.outputValue).filter((x) => x.length < 5 || x.length === 7).length;

export const assignment2 = () => {
    const map: Record<string, number> = {};

    // entries[0].signalPatterns.map((p) => {
    //     map[p] = console.log("=======");
    //     console.log(p);
    //     console.log(sortAlphabetic(p));
    //     console.log(segments[sortAlphabetic(p)]);

    //     return 0;
    // });
};
