import { pipe } from "effect";
import * as A from "effect/Array";
import { split } from "../../utils/string";
import { sum } from "../../utils";
import { input } from "./input";

const input12 = "2333133121414131402";

const assignment1 = () => {
	// split the input into an array of numbers
	const numbers = pipe(input, split(""), A.map(Number));

	const filled: string[] = [];

	const diskmap: string[] = numbers.flatMap((n, ind) => Array(n).fill(ind % 2 === 0 ? ind / 2 : "."));

	for (let i = 0, j = -1; diskmap.length + j >= i; ) {
		if (diskmap.at(j) === ".") {
			j--;
			continue;
		}
		if (diskmap[i] === ".") {
			filled.push(diskmap.at(j) || "");
			j--;
		} else filled.push(diskmap[i]);
		i++;
	}

	return sum(filled.map((d, i) => Number(d) * i));
};

const assignment2 = () => {
	// split the input into an array of numbers
	const numbers = pipe(input12, split(""), A.map(Number));

	const filled: string[] = [];

	const diskmap: string[] = numbers.flatMap((n, ind) => Array(n).fill(ind % 2 === 0 ? ind / 2 : "."));

	for (let i = 0, j = -1; diskmap.length + j >= i; ) {
		console.log(diskmap.at(j), diskmap[i]);
		console.log("----");

		if (diskmap.at(j) === ".") {
			j--;
			continue;
		}
		if (diskmap[i] === ".") {
			// filled.push(diskmap.at(j) || "");
			j--;
		}
		// else filled.push(diskmap[i]);
		i++;
	}

	return sum(filled.map((d, i) => Number(d) * i));
};

const Day = () => (
	<main>
		<h2>Day 9</h2>
		<p> Part one: {assignment1()} </p>
		<p> Part two: {assignment2()} </p>
	</main>
);

export default Day;
