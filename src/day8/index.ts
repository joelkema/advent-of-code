import { countChars, difference, sortAlphabeticly, swap } from "../utils";
import { input } from "./input";

type Entry = {
    signalPatterns: string[];
    outputValue: string[];
};

type Segment = "top" | "topLeft" | "topRight" | "center" | "bottomLeft" | "bottomRight" | "bottom";
type Configuration = Record<string, Segment>;

const two: Segment[] = ["top", "topRight", "center", "bottomLeft", "bottom"];
const three: Segment[] = ["top", "topRight", "center", "bottomRight", "bottom"];
const five: Segment[] = ["top", "topLeft", "center", "bottomRight", "bottom"];
const six: Segment[] = ["top", "topLeft", "center", "bottomRight", "bottomLeft", "bottom"];
const nine: Segment[] = ["top", "topLeft", "topRight", "center", "bottomRight", "bottom"];

const entries = input.reduce((map: Entry[], row: string) => {
    const splittedRow = row.split(" | ");
    const signalPatterns = splittedRow[0].split(" ");
    const outputValue = splittedRow[1].split(" ");

    map.push({ signalPatterns, outputValue });

    return map;
}, []);

const segmentsToNumber = (segment: Segment[]) => {
    const hasEverySegment = (arr: Segment[]) => segment.every((s) => arr.includes(s));

    if (segment.length === 2) return 1;
    if (segment.length === 4) return 4;
    if (segment.length === 3) return 7;
    if (segment.length === 7) return 8;

    if (hasEverySegment(two)) return 2;
    if (hasEverySegment(three)) return 3;
    if (hasEverySegment(five)) return 5;
    if (hasEverySegment(six)) return 6;
    if (hasEverySegment(nine)) return 9;

    return 0;
};

const mapToNumber = (config: Configuration, pattern: string) => {
    const chars = pattern.split("");
    const segments = chars.map((char) => config[char]);
    const number = segmentsToNumber(segments);

    return number;
};

/**
 * Given segment in: https://adventofcode.com/2021/day/8
 *
 * Each segment has the following occurences:
 * top: 8 <-- not unique
 * topLeft: 6
 * topRight: 8
 * center: 7
 * bottomLeft: 4
 * bottomRight: 9
 * bottom: 7
 */
const getConfiguration = (signalPatterns: string[]) => {
    const chars = countChars(signalPatterns.join(""));

    const configuration: Configuration = {};

    const allChars = Object.keys(chars);
    const allSegments = Object.values(configuration);

    // These are unique segments and can be added once
    for (let char in chars) {
        const amount = chars[char];

        if (amount === 4) configuration[char] = "bottomLeft";
        if (amount === 6) configuration[char] = "topLeft";
        if (amount === 9) configuration[char] = "bottomRight";
    }

    const checkTop = !allSegments.includes("top");
    const checkCenter = !allSegments.includes("center");
    const checkBottom = !allSegments.includes("bottom");

    while (Object.keys(configuration).length < 7) {
        const usedChars = Object.keys(configuration);

        if (checkTop) {
            // Figure out top
            // One and four don't have a top
            const oneOrFour = signalPatterns
                .filter(({ length }) => length === 2 || length === 4)
                .join("")
                .split("");

            const possibleTopChars = allChars.filter((key) => !oneOrFour.includes(key) && !usedChars.includes(key));

            if (possibleTopChars.length === 1) configuration[possibleTopChars[0]] = "top";
        }

        if (checkCenter) {
            // Figure out center
            // One and seven don't have a center
            const oneOrSeven = signalPatterns
                .filter(({ length }) => length === 2 || length === 3)
                .join("")
                .split("");

            const possibleCenterChars = allChars.filter((key) => !oneOrSeven.includes(key) && !usedChars.includes(key));

            if (possibleCenterChars.length === 1) configuration[possibleCenterChars[0]] = "center";
        }

        if (checkBottom) {
            // Figure out bottom
            const oneOrSevenOrFour = signalPatterns
                .filter(({ length }) => length === 2 || length === 3 || length === 4)
                .join("")
                .split("");

            const possibleBottomChars = allChars.filter(
                (key) => !oneOrSevenOrFour.includes(key) && !usedChars.includes(key),
            );

            if (possibleBottomChars.length === 1) configuration[possibleBottomChars[0]] = "bottom";
        }

        // Figuring out topRight is difficult
        if (usedChars.length === 6) {
            const diff = difference(usedChars, allChars);

            configuration[diff[0]] = "topRight";
        }
    }

    return configuration;
};

// https://adventofcode.com/2021/day/8
export const assignment1 = () => entries.flatMap((a) => a.outputValue).filter((x) => x.length < 5 || x.length === 7);

// https://adventofcode.com/2021/day/8#part2
export const assignment2 = () => {
    let total = 0;

    entries.forEach((entry) => {
        const { signalPatterns, outputValue } = entry;

        const config = getConfiguration(signalPatterns);

        const digits = signalPatterns.reduce((map: Record<string, number>, pattern) => {
            map[sortAlphabeticly(pattern)] = mapToNumber(config, pattern);
            return map;
        }, {});

        const digit = Number(outputValue.map((v) => digits[sortAlphabeticly(v)]).join(""));

        total += digit;
    });

    return total;
};
