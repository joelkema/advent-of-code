import { pipe } from "effect";
import * as A from "effect/Array";
import { split } from "../../utils/string";
import { input } from "./input";
import { sum, sumProduct } from "../../utils";

const getBanks = (i: string): number[][] =>
	pipe(
		i,
		split(/\n/),
		A.filter((a) => a !== ""),
		A.map(split("")),
		A.map(A.map(Number)),
	);

const getMaxJoltage =
	(comboSize: number) =>
		(arr: number[]): number => {
			const n = arr.length;
			if (comboSize <= 0 || comboSize > n) return 0;

			// how many elements we are allowed to drop
			let toDrop = n - comboSize;
			// monotonic stack
			const stack: number[] = [];

			for (const value of arr) {
				// while last picked is smaller and we can still drop, drop it
				while (toDrop > 0 && stack.length > 0 && stack[stack.length - 1] < value) {
					stack.pop();
					toDrop--;
				}
				stack.push(value);
			}

			// we might still need to trim if we didn't drop enough
			const best = stack.slice(0, comboSize);

			// concat to a number
			const asNumber = Number(best.map(String).join(""));
			return asNumber;
		};

const assignment1 = () => pipe(input, getBanks, A.map(getMaxJoltage(2)), sum);

const assignment2 = () => pipe(input, getBanks, A.map(getMaxJoltage(12)), sum);

const Day = () => (
	<main>
		<h2>Day 3 </h2>
		<p> Part one: {assignment1()} </p>
		<p> Part two: {assignment2()} </p>
	</main>
);

export default Day;
