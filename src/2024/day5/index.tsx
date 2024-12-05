import { pipe } from "effect";
import * as A from "effect/Array";
import { split } from "../../utils/string";
import { input } from "./input";

const mapInput = (input: string) => {
	const splitted = pipe(input, split("\n\n"));

	const rules = pipe(
		splitted[0],
		split("\n"),
		A.filter((a) => a !== ""),
	);

	const updates = pipe(
		splitted[1],
		split("\n"),
		A.filter((a) => a !== ""),
	);

	const graph: Map<number, Set<number>> = new Map();

	for (const rule of rules) {
		const [l, r] = rule.split("|").map(Number);
		graph.set(l, (graph.get(l) ?? new Set()).add(r));
	}

	return [graph, updates] as const;
};

const assignment1 = () => {
	let answer = 0;

	const [graph, updates] = mapInput(input);

	for (const update of updates) {
		const nums = update.split(",").map(Number);

		const ordered = nums.toSorted((a, b) => (graph.get(a)?.has(b) ? -1 : 1));
		const inOrder = nums.every((n, i) => n === ordered[i]);

		answer += inOrder ? nums[Math.floor(nums.length / 2)] : 0;
	}

	return answer;
};

const assignment2 = () => {
	let answer = 0;

	const [graph, updates] = mapInput(input);

	for (const update of updates) {
		const nums = update.split(",").map(Number);

		const ordered = nums.toSorted((a, b) => (graph.get(a)?.has(b) ? -1 : 1));
		const inOrder = nums.every((n, i) => n === ordered[i]);

		answer += inOrder ? 0 : ordered[Math.floor(ordered.length / 2)];
	}

	return answer;
};

const Day = () => (
	<main>
		<h2>Day 5</h2>
		<p> Part one: {assignment1()} </p>
		<p> Part two: {assignment2()} </p>
	</main>
);

export default Day;
