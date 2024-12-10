import { pipe } from "effect";
import * as A from "effect/Array";
import { split } from "../../utils/string";
import { input } from "./input";
import { sum } from "../../utils";

const getLines = (i: string) =>
	pipe(
		i,
		split(/\n/),
		A.filter((s) => s !== ""),
		A.map((s) => s.replace(":", "")),
		A.map(split(" ")),
		A.map(A.map(Number)),
	);

const findCombination = (target: number, numbers: number[], useConcat: boolean): boolean => {
	const evaluate = (nums: number[], ops: string[]): number => {
		let result = nums[0];
		for (let i = 0; i < ops.length; i++) {
			if (ops[i] === "+") {
				result += nums[i + 1];
			} else if (ops[i] === "*") {
				result *= nums[i + 1];
			} else if (useConcat && ops[i] === "||") {
				result = Number(`${result}${nums[i + 1]}`);
			}
		}
		return result;
	};

	const helper = (nums: number[], ops: string[]): boolean => {
		if (ops.length === nums.length - 1) {
			return evaluate(nums, ops) === target;
		}
		return (
			helper(nums, [...ops, "+"]) || helper(nums, [...ops, "*"]) || (useConcat && helper(nums, [...ops, "||"]))
		);
	};

	return helper(numbers, []);
};

const assignment1 = () => {
	const lines = getLines(input);

	const possibleCombinations: number[] = [];

	for (const [result, ...rest] of lines) {
		if (findCombination(result, rest, false)) {
			console.log(`Combination found for ${result}: ${rest} `);
			possibleCombinations.push(result);
		} else {
			console.log(`No combination found for ${result}`);
		}
	}

	return sum(possibleCombinations);
};

const assignment2 = () => {
	const lines = getLines(input);

	const possibleCombinations: number[] = [];

	for (const [result, ...rest] of lines) {
		if (findCombination(result, rest, true)) {
			console.log(`Combination found for ${result}: ${rest} `);
			possibleCombinations.push(result);
		} else {
			console.log(`No combination found for ${result}`);
		}
	}

	return sum(possibleCombinations);
};

const Day = () => (
	<main>
		<h2>Day 7</h2>
		<p> Part one: {assignment1()} </p>
		<p> Part two: {assignment2()} </p>
	</main>
);

export default Day;
