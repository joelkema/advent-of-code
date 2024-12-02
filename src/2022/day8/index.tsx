import { pipe } from "effect";
import { isLessThan } from "../../shared/predicates";
import { parseStringToInt, removeWhitespaces } from "../../utils";
import { filter, getColumn, map, max, slice } from "../../utils/array";
import { split } from "../../utils/string";
import { input } from "./input";

const grid = pipe(input, split(/\n/), filter(removeWhitespaces), map(split("" as any)), map(map(parseStringToInt)));

const checkTop = (y: number, x: number) => (matrix: number[][]) =>
	pipe(matrix, getColumn(x), slice(0, y), max, isLessThan(matrix[y][x]));

const checkRight = (y: number, x: number) => (matrix: number[][]) =>
	pipe(matrix[y], slice(-(matrix[0].length - x - 1)), max, isLessThan(matrix[y][x]));

const checkBottom = (y: number, x: number) => (matrix: number[][]) =>
	pipe(matrix, getColumn(x), slice(-(matrix.length - y - 1)), max, isLessThan(matrix[y][x]));

const checkLeft = (y: number, x: number) => (matrix: number[][]) =>
	pipe(matrix[y], slice(0, x), max, isLessThan(matrix[y][x]));

const toVisible = (row: number[], y: number) => (_: number, x: number) => {
	if (y === 0 || y === grid.length - 1 || x === 0 || x === row.length - 1) return true;

	const outcome = [checkTop(y, x), checkRight(y, x), checkBottom(y, x), checkLeft(y, x)];

	return outcome.some((x) => !!x(grid));
};

// const mapRow = (row: number[], y: number) => map(toVisible(row, y));

const assignment1 = () => {
	// const visible = Identity.of(grid).map(map(mapRow)).emit();

	const visible = grid.map((row, y) =>
		row.map((_, x) => {
			if (y === 0 || y === grid.length - 1 || x === 0 || x === row.length - 1) return true;

			const outcome = [checkTop(y, x), checkRight(y, x), checkBottom(y, x), checkLeft(y, x)];

			return outcome.some((x) => !!x(grid));
		}),
	);

	console.log(visible);

	return visible.flatMap((a) => a.filter((b) => !!b)).length;
};

const Day = () => (
	<main>
		<h2>Day 8</h2>

		<p>Part one: {assignment1()}</p>
	</main>
);

export default Day;
