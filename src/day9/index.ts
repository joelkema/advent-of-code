import { sum } from "../utils";
import { input } from "./input";

const isLowest = (location: number, adjacent: number[]) => location < Math.min(...adjacent);
const add = (a: number) => (b: number) => a + b;
const isNil = (a: any) => a === null || a === undefined;

const getAdjacent = (locations: number[][], x: number, y: number) => {
    const up = !isNil(locations[y - 1]) ? locations[y - 1][x] : null;
    const down = !isNil(locations[y + 1]) ? locations[y + 1][x] : null;
    const right = !isNil(locations[y]) && !isNil(locations[y][x + 1]) ? locations[y][x + 1] : null;
    const left = !isNil(locations[y]) && !isNil(locations[y][x - 1]) ? locations[y][x - 1] : null;

    return [up, down, left, right].filter((x) => x !== null) as number[];
};

// https://adventofcode.com/2021/day/9
export const assignment1 = () => {
    const lowest: number[] = [];
    const locations = input.split("\n").map((n) => n.split("").map(Number));

    for (let y = 0; y < locations.length; y++) {
        const row = locations[y];

        for (let x = 0; x < row.length; x++) {
            const location = row[x];

            const adjacent = getAdjacent(locations, x, y);

            if (isLowest(location, adjacent)) lowest.push(location);
        }
    }

    const riskLevel = sum(lowest.map(add(1)));
    console.log(riskLevel);
};

// https://adventofcode.com/2021/day/9#part2
export const assignment2 = () => {};
