import { pipe } from "effect";
import * as A from "effect/Array";
import { split } from "../../utils/string";
import { input } from "./input";

const getLines = (i: string) =>
	pipe(
		i,
		split(/\n/),
		A.filter((a) => a !== ""),
		A.map(split("")),
	);

const assignment1 = () => {
	const lines = getLines(input);

	let amount = 0;

	for (let i = 0; i < lines.length; i++) {
		const chars = lines[i];

		for (let j = 0; j < chars.length; j++) {
			if (chars[j] === "X") {
				// Horizontal: check if the next 3 characters are X M A S
				if (chars[j + 1] === "M" && chars[j + 2] === "A" && chars[j + 3] === "S") {
					amount++;
				}

				// Horizontal: check if the previous 3 characters are X M A S
				if (chars[j - 1] === "M" && chars[j - 2] === "A" && chars[j - 3] === "S") {
					amount++;
				}

				// Vertical: check if the next 3 characters are X M A S
				if (
					lines[i + 1] &&
					lines[i + 1][j] === "M" &&
					lines[i + 2] &&
					lines[i + 2][j] === "A" &&
					lines[i + 3] &&
					lines[i + 3][j] === "S"
				) {
					amount++;
				}

				// Vertical: check if the previous 3 characters are X M A S
				if (
					lines[i - 1] &&
					lines[i - 1][j] === "M" &&
					lines[i - 2] &&
					lines[i - 2][j] === "A" &&
					lines[i - 3] &&
					lines[i - 3][j] === "S"
				) {
					amount++;
				}

				// Diagonal: top left to bottom right
				if (
					lines[i + 1] &&
					lines[i + 1][j + 1] === "M" &&
					lines[i + 2] &&
					lines[i + 2][j + 2] === "A" &&
					lines[i + 3] &&
					lines[i + 3][j + 3] === "S"
				) {
					amount++;
				}

				// Diagonal: top right to bottom left
				if (
					lines[i - 1] &&
					lines[i - 1][j - 1] === "M" &&
					lines[i - 2] &&
					lines[i - 2][j - 2] === "A" &&
					lines[i - 3] &&
					lines[i - 3][j - 3] === "S"
				) {
					amount++;
				}

				// Diagonal: bottom left to top right
				if (
					lines[i + 1] &&
					lines[i + 1][j - 1] === "M" &&
					lines[i + 2] &&
					lines[i + 2][j - 2] === "A" &&
					lines[i + 3] &&
					lines[i + 3][j - 3] === "S"
				) {
					amount++;
				}

				// Diagonal: bottom right to top left
				if (
					lines[i - 1] &&
					lines[i - 1][j + 1] === "M" &&
					lines[i - 2] &&
					lines[i - 2][j + 2] === "A" &&
					lines[i - 3] &&
					lines[i - 3][j + 3] === "S"
				) {
					amount++;
				}
			}
		}
	}

	return amount;
};

const checkForCross = (lines: string[][]) => {
	let amount = 0;

	for (let i = 0; i < lines.length; i++) {
		const chars = lines[i];

		for (let j = 0; j < chars.length; j++) {
			const char = chars[j];

			const topRight = chars[j + 2];
			const middle = lines[i + 1] && lines[i + 1][j + 1];
			const bottomLeft = lines[i + 2] && lines[i + 2][j];
			const bottomRight = lines[i + 2] && lines[i + 2][j + 2];

			const leftDiagonal = char + middle + bottomRight;
			const rightDiagonal = topRight + middle + bottomLeft;

			if (leftDiagonal !== "MAS" && leftDiagonal !== "SAM") continue;
			if (rightDiagonal !== "MAS" && rightDiagonal !== "SAM") continue;

			amount++;
		}
	}

	return amount;
};

const assignment2 = () => pipe(input, getLines, checkForCross);

const Day = () => (
	<main>
		<h2>Day 4</h2>
		<p> Part one: {assignment1()} </p>
		<p> Part two: {assignment2()} </p>
	</main>
);

export default Day;
