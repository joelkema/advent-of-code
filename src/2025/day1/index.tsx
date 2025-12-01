import { pipe } from "effect";
import * as A from "effect/Array";
import { split } from "../../utils/string";
import { input } from "./input";

type Direction = "L" | "R";

type Instruction = readonly [Direction, number];

type Rotation = {
	dir: Direction;
	amount: number;
};

const splitDirAmount = (s: string): Instruction => {
	const [, dir, amount] = s.match(/^([A-Za-z]+)(\d+)$/)!;
	return [dir as Direction, Number(amount)];
};

const getInstructions = (i: string): ReadonlyArray<Instruction> =>
	pipe(
		i,
		split(/\n/),
		A.filter((a) => a !== ""),
		A.map(splitDirAmount),
	);

const rotateDial = (start: number, { dir, amount }: Rotation) => {
	const step = dir === "R" ? 1 : -1;
	const raw = start + step * amount;
	const max = 100;
	const newValue = ((raw % max) + max) % max;

	let zeroClicks: number;

	if (dir === "R") {
		zeroClicks = Math.floor((start + amount) / max);
	} else {
		if (start === 0) {
			// from 0 going left, we hit 0 every full turn
			zeroClicks = Math.floor(amount / max);
		} else if (amount < start) {
			// we don't reach 0
			zeroClicks = 0;
		} else {
			// first hit at k = start, then every max steps
			zeroClicks = Math.floor((amount - start) / max) + 1;
		}
	}

	return { newValue, zeroClicks };
};

const assignment1 = () =>
	pipe(
		input,
		getInstructions,
		A.reduce({ dial: 50, zeros: 0 }, (acc, [dir, amount]) => {
			const { newValue } = rotateDial(acc.dial, { dir, amount });
			return {
				dial: newValue,
				zeros: acc.zeros + (newValue === 0 ? 1 : 0),
			};
		}),
		(acc) => acc.zeros,
	);

const assignment2 = () =>
	pipe(
		input,
		getInstructions,
		A.reduce({ dial: 50, zeroClicks: 0 }, (acc, [dir, amount]) => {
			const rotation = rotateDial(acc.dial, { dir, amount });
			return {
				dial: rotation.newValue,
				zeroClicks: acc.zeroClicks + rotation.zeroClicks,
			};
		}),
		(acc) => acc.zeroClicks,
	);

const Day = () => (
	<main>
		<h2>Day 1 </h2>
		<p> Part one: {assignment1()} </p>
		<p> Part two: {assignment2()} </p>
	</main>
);

export default Day;
