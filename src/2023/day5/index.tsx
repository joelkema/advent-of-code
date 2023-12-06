import { pipe } from "fp-ts/lib/function";
import { split } from "../../utils/string";
import { removeWhitespaces, sum } from "../../utils";
import * as A from "fp-ts/Array";
import { input } from "./input";
import { intersection } from "fp-ts/Array";
import * as N from "fp-ts/number";
import * as O from "fp-ts/Option";
import { initial } from "lodash";

type Seed = {
    seed: number;
    soil: number;
    fertilizer: number;
    water: number;
    light: number;
    temperature: number;
    humidity: number;
    location: number;
};

const splitByDoubleEnter = split(/\n\s*\n/);

const getBlocks = (i: string) => pipe(i, splitByDoubleEnter);

// destinationRangeStart = soil
// sourceRangeStart = seed
const sourceToDestination = (numbers: number[][]) => {
    const min = 0;
    const max = Math.max(...numbers.map((arr) => Math.max(...arr)));

    // generate an array of index with the size of max
    const values: number[] = Array.from(Array(max).keys());

    for (let i = min; i < numbers.length; i++) {
        const [destinationRangeStart, sourceRangeStart, rangeLength] = numbers[i];

        // generate a range of numbers from destinationRangeStart to rangeLength
        let destinationRange: number[] = [];
        for (let i = 0; i < rangeLength; i++) {
            destinationRange.push(i + destinationRangeStart);
        }

        // generate a range of numbers from sourceRangeStart to rangeLength
        let sourceRange: number[] = [];
        for (let i = 0; i < rangeLength; i++) {
            sourceRange.push(i + sourceRangeStart);
        }

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
            .filter((a) => a.length > 0),
    );

    const soil = sourceToDestination(seedToSoil);
    const fertilizer = sourceToDestination(soilToFertilizer);

    console.log("fertilizerToWater");
    console.log(fertilizerToWater);

    const water = sourceToDestination(fertilizerToWater);
    const light = sourceToDestination(waterToLight);
    const temperature = sourceToDestination(lightTotemperature);

    const humidity = sourceToDestination(temperatureToHumidity);
    const location = sourceToDestination(humidityToLocation);

    const all = seeds[0].map((seed) => {
        const seedSoil = soil[seed];
        const soilFertilizer = fertilizer[seedSoil] || seedSoil;
        const fertilizerWater = water[soilFertilizer] || soilFertilizer;
        const waterLight = light[fertilizerWater] || fertilizerWater;
        const lightTemperature = temperature[waterLight] || waterLight;
        const temperatureHumidity = humidity[lightTemperature] || lightTemperature;
        const humidityLocation = location[temperatureHumidity] || temperatureHumidity;

        console.log(seed, seedSoil);

        return {
            seed,
            soil: seedSoil,
            fertilizer: soilFertilizer,
            water: fertilizerWater,
            light: waterLight,
            temperature: lightTemperature,
            humidity: temperatureHumidity,
            location: humidityLocation,
        };
    });

    const locations = all.map((s) => s.location);

    console.log(all);

    return Math.min(...locations);
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
