import { pipe } from "fp-ts/lib/function";
import { split } from "../../utils/string";
import { removeWhitespaces, sum } from "../../utils";
import * as A from "fp-ts/Array";
import { input } from "./input";
import { intersection } from "fp-ts/Array";
import * as N from "fp-ts/number";
import * as O from "fp-ts/Option";
import { initial } from "lodash";

const splitByDoubleEnter = split(/\n\s*\n/);

const getBlocks = (i: string) => pipe(i, splitByDoubleEnter);

// destinationRangeStart = soil
// sourceRangeStart = seed
const sourceToDestination = (numbers: number[][]) => {
    const min = 0;
    const max = Math.max(...numbers.map((arr) => Math.max(...arr)));

    // generate an array of index with the size of max
    const values = Array.from(Array(max).keys());

    for (let i = min; i < numbers.length; i++) {
        const [destinationRangeStart, sourceRangeStart, rangeLength] = numbers[i];

        // generate a range of numbers from destinationRangeStart to rangeLength
        const destinationRange = Array.from(Array(rangeLength).keys()).map((i) => i + destinationRangeStart);

        // generate a range of numbers from sourceRangeStart to rangeLength
        const sourceRange = Array.from(Array(rangeLength).keys()).map((i) => i + sourceRangeStart);

        // combine sourceRange as key, and destinationRange as value
        // so values[sourceRange[i]] = destinationRange[i]

        for (let i = 0; i < rangeLength; i++) {
            values[sourceRange[i]] = destinationRange[i];
        }
    }

    return values;
};

const assignment1 = () => {
    // const seedToSoil = sourceToDestination([
    //     [50, 98, 2],
    //     [52, 50, 48],
    // ]);

    const blocks = getBlocks(input);

    // i want a regex which detects letters spaces and dashes:
    // anbd replaces that with a empty space
    // then i want to split by empty space
    // then i want to filter out empty strings
    // then i want to map to number
    // then i want to filter out NaN

    const [
        seeds,
        seedToSoil,
        soilToFertilizer,
        fertilizerToWater,
        waterToLight,
        lightTotemperature,
        temperatureToHumidity,
        humidityToLocation,
    ] = blocks.map((block) =>
        block
            .replace(/[a-z-:]/g, "")
            .split("\n")
            .map((line) =>
                line
                    .split(" ")
                    .filter((n) => n !== "")
                    .map(Number),
            )
            .filter(A.isNonEmpty),
    );

    const soil = sourceToDestination(seedToSoil);

    debugger;
};

const assignment2 = () => {};

const Day = () => (
    <main>
        <h2>Day 5</h2>
        <p>Part one: {assignment1()}</p>
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
