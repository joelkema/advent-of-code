import { input } from "./input";

type Entry = {
    signalPatterns: string[];
    outputValue: string[];
};

// const segments = {
//     cf: 1,
//     bcdf: 4,
//     acf: 7,
//     abcdefg: 8,
// };

const entries = input.reduce((map: Entry[], row: string) => {
    const splittedRow = row.split(" | ");
    const signalPatterns = splittedRow[0].split(" ");
    const outputValue = splittedRow[1].split(" ");

    map.push({ signalPatterns, outputValue });

    return map;
}, []);

export const assignment1 = () =>
    entries.flatMap((a) => a.outputValue).filter((x) => x.length < 5 || x.length === 7).length;
