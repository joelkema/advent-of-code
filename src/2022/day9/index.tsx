import { pipe } from "effect";
import { parseStringToInt, removeWhitespaces } from "../../utils";
import { filter, getColumn, map, max, slice } from "../../utils/array";
import { split } from "../../utils/string";
import { input } from "./input";

const grid = pipe(input, split(/\n/), filter(removeWhitespaces), map(split("" as any)), map(map(parseStringToInt)));
const columns = grid[0].length;
const rows = grid.length;

const getTop = (y: number, x: number) => (matrix: number[][]) => pipe(matrix, getColumn<number>(x), slice(0, y));

const checkTop = (y: number, x: number) => max(getColumn<number>(x)(grid).slice(0, y)) < grid[y][x];
const checkRight = (y: number, x: number) => max(grid[y].slice(-(columns - x - 1))) < grid[y][x];
const checkBottom = (y: number, x: number) => max(getColumn<number>(x)(grid).slice(-(rows - y - 1))) < grid[y][x];
const checkLeft = (y: number, x: number) => max(grid[y].slice(0, x)) < grid[y][x];

const toVisible = (row: number[], y: number) => (_: number, x: number) => {
	if (y === 0 || y === grid.length - 1 || x === 0 || x === row.length - 1) return true;

	const outcome = [checkTop(y, x), checkRight(y, x), checkBottom(y, x), checkLeft(y, x)];

	return outcome.some((x) => !!x);
};

// const mapRow = (row: number[], y: number) => map(toVisible(row, y));

const assignment1 = () => {
	// const visible = Identity.of(grid).map(map(mapRow)).emit();

	const visible = grid.map((row, y) =>
		row.map((_, x) => {
			if (y === 0 || y === grid.length - 1 || x === 0 || x === row.length - 1) return true;

			const height = grid[y][x];

			const outcome = [checkTop(y, x), checkRight(y, x), checkBottom(y, x), checkLeft(y, x)];

			return outcome.some((x) => !!x);
		}),
	);

	console.log(visible);

	return visible.flatMap((a) => a.filter((b) => !!b)).length;
};

const Day = () => (
	<main>
		<h2>Day 9</h2>

		<p>Part one: {assignment1()}</p>
	</main>
);

export default Day;
