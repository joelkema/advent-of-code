import { pipe, Record } from "effect";
import { split } from "../../utils/string";
import * as A from "effect/Array";
import { sum } from "../../utils";

const input2 = "5 89749 6061 43 867 1965860 0 206250";

const blink =
	(times: number) =>
		(input: number[]): Record<number, number> => {
			let result: Record<number, number> = input.reduce(
				(acc, number) => {
					acc[number] = (acc[number] || 0) + 1;
					return acc;
				},
				{} as Record<number, number>,
			);

			for (let i = 0; i < times; i++) {
				const newResult: Record<number, number> = {};
				for (const [number, times] of Object.entries(result)) {
					const num = Number(number);
					if (num === 0) {
						newResult[1] = (newResult[1] || 0) + times;
					} else if (num.toString().length % 2 === 0) {
						const half = num.toString().length / 2;
						const firstHalf = Number(num.toString().slice(0, half));
						const secondHalf = Number(num.toString().slice(half));
						newResult[firstHalf] = (newResult[firstHalf] || 0) + times;
						newResult[secondHalf] = (newResult[secondHalf] || 0) + times;
					} else {
						newResult[num * 2024] = (newResult[num * 2024] || 0) + times;
					}
				}

				result = newResult;
			}

			return result;
		};

const values = (obj: Record<number, number>) => Object.values(obj);

const assignment1 = () => pipe(input2, split(" "), A.map(Number), blink(25), values, sum);
const assignment2 = () => pipe(input2, split(" "), A.map(Number), blink(75), values, sum);

const Day = () => (
	<main>
		<h2>Day 11 </h2>
		<p> Part one: {assignment1()} </p>
		<p> Part two: {assignment2()} </p>
	</main>
);

export default Day;
