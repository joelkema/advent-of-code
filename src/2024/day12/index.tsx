import { pipe } from "effect";
import { split } from "../../utils/string";
import * as A from "effect/Array";
import { sum } from "../../utils";

const input2 = `
OOOOO
OXOXO
OOOOO
OXOXO
OOOOO
`;

// make a function to plot visually the grid
// so input2 becomes
/**
 *
+-+-+-+-+
|A A A A|
+-+-+-+-+     +-+
			  |D|
+-+-+   +-+   +-+
|B B|   |C|
+   +   + +-+
|B B|   |C C|
+-+-+   +-+ +
		  |C|
+-+-+-+   +-+
|E E E|
+-+-+-+
 */

type Point = { x: number; y: number };

const getLines = (i: string) =>
	pipe(
		i,
		split(/\n/),
		A.filter((s) => !!s),
		A.map(split("")),
	);

const getNeighbors = (p: Point) => [
	{ x: p.x - 1, y: p.y },
	{ x: p.x + 1, y: p.y },
	{ x: p.x, y: p.y - 1 },
	{ x: p.x, y: p.y + 1 },
];

// get area and perimeter of a section
// so AAAA has area 4 and perimeter 10
const getPerimeterAndArea = (garden: string[][]) => {
	const perimeter: Record<string, number> = {};
	const area: Record<string, Point[]> = {};
	const processed: string[][] = [];

	for (let row = 0; row < garden.length; row++) {
		for (let col = 0; col < garden[row].length; col++) {
			const processedCell = processed[row]?.[col];

			if (processedCell) {
				continue;
			}
			const cell = garden[row][col];
			const point = { x: col, y: row };
			const neighbors = getNeighbors(point);

			if (!area[cell]) {
				area[cell] = [point];
			}
			if (!perimeter[cell]) {
				perimeter[cell] = 0;
			}

			// check if the neighbors are processed and part of a region

			for (let n = 0; n < neighbors.length; n++) {
				const neighbor = neighbors[n];
				const neighborCell = garden[neighbor.y]?.[neighbor.x];

				if (!neighborCell) {
					perimeter[cell]++;
				} else if (neighborCell !== cell) {
					perimeter[cell]++;
				} else {
					if (area[cell].every((p) => p.x !== neighbor.x || p.y !== neighbor.y)) {
						area[cell].push(neighbor);
					}
				}
			}
		}
	}

	return { perimeter, area };
};

const assignment1 = () => {
	const grid = getLines(input2);

	const { perimeter, area } = getPerimeterAndArea(grid);
	debugger;

	return null;
};

const Day = () => (
	<main>
		<h2>Day 12 </h2>
		<p> Part one: {assignment1()} </p>
	</main>
);

export default Day;
