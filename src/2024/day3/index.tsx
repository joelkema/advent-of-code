import { input } from "./input";

const assignment1 = () =>
	[...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/gm)].reduce(
		(acc: number, [, a, b]) => acc + Number(a) * Number(b),
		0,
	);

const assignment2 = () => {
	let enabled = true;
	let score = 0;

	const matches = [...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)/gm)];

	for (const match of matches) {
		const [op, a, b] = match;

		if (op.startsWith("mul") && enabled) {
			score += Number(a) * Number(b);
		} else if (op === "do()") {
			enabled = true;
		} else if (op === "don't()") {
			enabled = false;
		}
	}
	return score;
};

const Day = () => (
	<main>
		<h2>Day 3</h2>
		<p> Part one: {assignment1()} </p>
		<p> Part two: {assignment2()} </p>
	</main>
);

export default Day;
