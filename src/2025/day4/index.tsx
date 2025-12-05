import { pipe } from "effect";
import * as A from "effect/Array";
import { split } from "../../utils/string";
import { input } from "./input";

const getGrid = (i: string): string[][] =>
	pipe(
		i,
		split(/\n/),
		A.filter((a) => a !== ""),
		A.map(split("")),
	);

const content = (x: number, y: number, grid: string[][]) => {
	return `${x},${y}: ${grid[y][x]}`;
};

// get all eight adjacent position
const getNeighbours = (x: number, y: number, grid: string[][]) => {
	const hasLeft = x > 0;
	const hasRight = x < grid[0].length - 1;
	const hasTop = y > 0;
	const hasBottom = y < grid.length - 1;

	const left = hasLeft ? content(x - 1, y, grid) : null;
	const right = hasRight ? content(x + 1, y, grid) : null;
	const top = hasTop ? content(x, y - 1, grid) : null;
	const bottom = hasBottom ? content(x, y + 1, grid) : null;
	const topLeft = hasTop && hasLeft ? content(x - 1, y - 1, grid) : null;
	const topRight = hasTop && hasRight ? content(x + 1, y - 1, grid) : null;
	const bottomLeft = hasBottom && hasLeft ? content(x - 1, y + 1, grid) : null;
	const bottomRight = hasBottom && hasRight ? content(x + 1, y + 1, grid) : null;

	return [left, right, top, bottom, topLeft, topRight, bottomLeft, bottomRight];
};

const getRollOfPapers = (grid: string[][]) => {
	let papers = 0;

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			const neighbours = getNeighbours(x, y, grid);

			const neighbourPapers = neighbours.filter((a) => a && a.includes("@"));

			const node = grid[y][x];

			if (node === "@" && neighbourPapers.length < 4) {
				papers++;
			}
		}
	}

	return papers;
};

const assignment1 = () => {
	const grid = getGrid(input);

	const rollOfPapers = getRollOfPapers(grid);

	return rollOfPapers;
};

const Day = () => (
	<main>
		<h2>Day 4</h2>
		<p> Part one: {assignment1()} </p>
		{/* <p> Part two: {assignment2()} </p> */}
	</main>
);

export default Day;
