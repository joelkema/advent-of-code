import { isNil } from "lodash";
import { sortNumeric, sum, sumProduct } from "../utils";
import { input } from "./input";

type Point = {
    x: number;
    y: number;
    height: number;
};

const isLowest = (height: number, adjacent: Point[]) => height < Math.min(...adjacent.map((a) => a.height));
const add = (a: number) => (b: number) => a + b;

const getAdjacent = (points: Point[][], x: number, y: number) => {
    const up = !isNil(points[y - 1]) ? points[y - 1][x] : null;
    const down = !isNil(points[y + 1]) ? points[y + 1][x] : null;
    const right = !isNil(points[y]) && !isNil(points[y][x + 1]) ? points[y][x + 1] : null;
    const left = !isNil(points[y]) && !isNil(points[y][x - 1]) ? points[y][x - 1] : null;

    return [up, down, left, right].filter((x) => x !== null) as Point[];
};

const findLowest = (points: Point[][]) => {
    const lowest: Point[] = [];
    for (let y = 0; y < points.length; y++) {
        const row = points[y];

        for (let x = 0; x < row.length; x++) {
            const { height } = row[x];

            const adjacent = getAdjacent(points, x, y);

            if (isLowest(height, adjacent)) lowest.push({ y, x, height });
        }
    }
    return lowest;
};

const mapToPoints = (str: string) =>
    str.split("\n").flatMap((row, y) =>
        row.split("").reduce((map: Point[][], height: string, x: number) => {
            if (!map[y]) map[y] = [];

            map[y][x] = { x, y, height: Number(height) };
            return map;
        }, []),
    );

const setBasin = (basin: Point[], points: Point[][]) => (point: Point) => {
    if (!basin.includes(point)) basin.push(point);

    const { x, y } = point;
    const adjacent = getAdjacent(points, x, y);

    // Locations of height 9 do not count as being in any basin, and all other locations will always be part of exactly one basin.
    const locations = adjacent.filter(
        (location) => location.height !== 9 && !basin.filter(({ x, y }) => x === location.x && y === location.y).length,
    );

    locations.forEach(setBasin(basin, points));
};

// https://adventofcode.com/2021/day/9
export const assignment1 = () => sum(findLowest(mapToPoints(input)).map((p) => add(1)(p.height)));

// https://adventofcode.com/2021/day/9#part2
export const assignment2 = () => {
    const points = mapToPoints(input);
    const lowPoints = findLowest(points);

    const basinSizes: number[] = [];

    lowPoints.map((point) => {
        const basin: Point[] = [];

        setBasin(basin, points)(point);

        basinSizes.push(basin.length);
    });

    return sumProduct(sortNumeric(basinSizes).slice(0, 3));
};
