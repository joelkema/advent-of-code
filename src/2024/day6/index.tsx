import { pipe } from "effect";
import * as A from "effect/Array";
import { split } from "../../utils/string";
import { input } from "./input";

const input12 = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`;

const getGrid = (i: string) =>
	pipe(
		i,
		split(/\n/),
		A.filter((s) => !!s),
		A.map(split("")),
	);

const getStartingPosition = (grid: string[][]) =>
	grid.reduce(
		(acc, row, i) => {
			if (acc.row > -1) return acc;

			const col = row.indexOf("^");
			if (col > -1) return { row: i, col };
			return acc;
		},
		{ row: -1, col: -1 },
	);

type TravelProps = {
	currentPosition: { row: number; col: number };
	grid: string[][];
	direction: string;
	visited: Set<string>;
	potentialLoops: string[];
};

const travel = ({ currentPosition, grid, direction, visited, potentialLoops }: TravelProps) => {
	const previousPosition = { ...currentPosition };

	// fill current position with X
	grid[currentPosition.row][currentPosition.col] = "X";

	if (direction === "^") {
		currentPosition.row -= 1;
	} else if (direction === ">") {
		currentPosition.col += 1;
	} else if (direction === "v") {
		currentPosition.row += 1;
	} else if (direction === "<") {
		currentPosition.col -= 1;
	}

	const row = grid[currentPosition.row];

	if (!row) {
		return {
			outOfBounds: true,
			currentPosition,
			grid,
			direction,
		};
	}

	const cell = row[currentPosition.col];

	if (!cell) {
		return {
			outOfBounds: true,
			currentPosition,
			grid,
			direction,
		};
	}

	if (cell === "#" || cell === "O") {
		currentPosition = previousPosition;

		if (direction === "^") {
			direction = ">";
		} else if (direction === ">") {
			direction = "v";
		} else if (direction === "v") {
			direction = "<";
		} else if (direction === "<") {
			direction = "^";
		}
	} else {
		// so the cell with an obstruction is passed twice
		if (visited.has(`${currentPosition.row},${currentPosition.col}`)) {
			// there is a loop here
			potentialLoops.push(`${currentPosition.row},${currentPosition.col}`);
		} else {
			visited.add(`${currentPosition.row},${currentPosition.col}`);
		}
	}

	return {
		inLoop: false,
		outOfBounds: false,
		currentPosition,
		grid,
		direction,
	};
};

const assignment1 = () => {
	let grid = getGrid(input12);
	let currentPosition = getStartingPosition(grid);
	let direction = grid[currentPosition.row][currentPosition.col];
	let outOfBounds = false;

	while (!outOfBounds) {
		const result = travel({ grid, currentPosition, direction, visited: new Set(), potentialLoops: [] });
		outOfBounds = result.outOfBounds;
		currentPosition = result.currentPosition;
		direction = result.direction;
		grid = result.grid;

		if (outOfBounds) {
			break;
		}
	}

	const str = grid.map((r) => r.join("")).join("\n");

	// return all X
	return str.split("X").length - 1;
};

const assignment2 = () => {
	let grid = getGrid(input12);
	let currentPosition = getStartingPosition(grid);
	let direction = grid[currentPosition.row][currentPosition.col];
	let outOfBounds = false;

	// keep track of visited cells
	const visited = new Set<string>();

	// add starting position to visited
	visited.add(`${currentPosition.row},${currentPosition.col}`);

	const potentialLoops: string[] = [];

	// travel entire road till out of bounds
	while (!outOfBounds) {
		const result = travel({ grid, currentPosition, direction, visited, potentialLoops });
		outOfBounds = result.outOfBounds;
		currentPosition = result.currentPosition;
		direction = result.direction;
		grid = result.grid;

		if (outOfBounds) {
			break;
		}
	}

	// place an O on the cell in the direction when a cell is already visited, forcing a loop

	debugger;

	return null;
};

const Day = () => (
	<main>
		<h2>Day 6 </h2>
		<p> Part one: {assignment1()} </p>
		<p> Part two: {assignment2()} </p>
	</main>
);

export default Day;
