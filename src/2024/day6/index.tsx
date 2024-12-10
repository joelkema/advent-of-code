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

type Direction = "^" | ">" | "v" | "<";

type Point = {
	row: number;
	col: number;
};

const getGrid = (i: string) =>
	pipe(
		i,
		split(/\n/),
		A.filter((s) => !!s),
		A.map(split("")),
	);

const findOnGrid = (grid: string[][], char: string): Point =>
	grid.reduce(
		(acc, row, i) => {
			if (acc.row > -1) return acc;

			const col = row.indexOf(char);
			if (col > -1) return { row: i, col };
			return acc;
		},
		{ row: -1, col: -1 },
	);

type TravelProps = {
	currentPosition: Point;
	grid: string[][];
	direction: Direction;
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
	let guard = findOnGrid(grid, "^");
	let direction = grid[guard.row][guard.col] as Direction;
	let outOfBounds = false;

	while (!outOfBounds) {
		const result = travel({ grid, currentPosition: guard, direction, visited: new Set(), potentialLoops: [] });
		outOfBounds = result.outOfBounds;
		guard = result.currentPosition;
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

const key = (p: Point, direction: Direction) => `${p.row}-${p.col}`;

const assignment2 = () => {
	const grid = getGrid(input);
	let guard = findOnGrid(grid, "^");
	let direction = grid[guard.row][guard.col] as Direction;
	let outOfBounds = false;

	// keep track of visited cells
	const visited = new Set<string>();

	// add starting position to visited
	visited.add(key(guard, direction));

	const potentialLoops: Point[] = [];
	const potentialLoopCols: number[] = [];

	// travel entire road till out of bounds
	while (!outOfBounds) {
		const previousPosition = { ...guard };

		// fill current position with X

		if (direction === "^") {
			guard.row -= 1;
		} else if (direction === ">") {
			guard.col += 1;
		} else if (direction === "v") {
			guard.row += 1;
		} else if (direction === "<") {
			guard.col -= 1;
		}

		const row = grid[guard.row];

		if (!row) {
			outOfBounds = true;
			break;
		}

		const cell = row[guard.col];

		if (!cell) {
			outOfBounds = true;
			break;
		}

		// check if we are in a potential loop column
		if (potentialLoopCols.includes(guard.col) && !visited.has(key(guard, direction))) {
			// check if we are in a potential loop
			console.log("we are in a potential loop");

			grid[guard.row][guard.col] = "P";
		}

		if (cell === "#" || cell === "O") {
			guard = previousPosition;

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
			// grid[currentPosition.row][currentPosition.col] = "I ";
			const k = key(guard, direction);

			// so the cell with an obstruction is passed twice
			if (visited.has(k)) {
				grid[guard.row][guard.col] = "X";

				// there is a loop here
				potentialLoops.push(guard);
				potentialLoopCols.push(guard.col);
			} else {
				visited.add(k);
			}
		}
	}

	// place an O on the cell in the direction when a cell is already visited, forcing a loop

	const str = grid.map((r) => r.join("")).join("\n");

	return potentialLoops.length + Array.from(new Set(potentialLoopCols)).length;
};

const Day = () => (
	<main>
		<h2>Day 6 </h2>
		<p> Part one: {assignment1()} </p>
		<p> Part two: {assignment2()} </p>
	</main>
);

export default Day;
