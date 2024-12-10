import { pipe } from "effect";
import * as A from "effect/Array";
import { split } from "../../utils/string";
import { sum } from "../../utils";
import { at } from "effect/RedBlackTree";
import { forEach } from "effect/Chunk";

const input12 = `
B..B..B...
..........
..........
....a.....
..........
.....a....
..........
..........
..........
..........
`;

const getLines = (i: string) =>
	pipe(
		i,
		split(/\n/),
		A.filter((s) => s !== ""),
		A.map(split("")),
	);

type Point = {
	row: number;
	col: number;
};

const getAntennas = (grid: string[][]): Record<string, Point[]> => {
	// antennas can be Uppercase, lowercase or numbers
	const regex = /[a-zA-Z0-9]/;

	const antennas: Record<string, Point[]> = {};
	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[row].length; col++) {
			const char = grid[row][col];
			if (!regex.test(char)) continue;

			if (!antennas[char]) antennas[char] = [];
			antennas[char].push({ row, col });
		}
	}

	return antennas;
};

// verify if all antennas are in the same row or column
// also verify that the distance between antennas is at least 1 node between
const getAntennasInLine = (antennas: Record<string, Point[]>) => {
	const antennasInLine: Record<string, Point[]> = {};

	for (const antenna in antennas) {
		const points = antennas[antenna];
		const [first, ...rest] = points;

		const getInTheSameRow = rest.filter((p) => p.row === first.row && Math.abs(p.col - first.col) > 1);
		const getInTheSameCol = rest.filter((p) => p.col === first.col && Math.abs(p.row - first.row) > 1);
		const getInTheSameDiagonal = rest.filter(
			(p) => Math.abs(p.row - first.row) === Math.abs(p.col - first.col) && Math.abs(p.row - first.row) > 1,
		);

		console.log(getInTheSameRow, getInTheSameCol, getInTheSameDiagonal);
	}

	return antennasInLine;
};

const assignment1 = () => {
	const grid = getLines(input12);

	const antennas = getAntennas(grid);

	const antennasInLine = getAntennasInLine(antennas);

	debugger;
	return true;
};

const Day = () => (
	<main>
		<h2>Day 8</h2>
		<p> Part one: {assignment1()} </p>
	</main>
);

export default Day;
