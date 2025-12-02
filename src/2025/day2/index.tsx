import { identity, pipe } from "effect";
import { sum } from "../../utils";
import { split } from "../../utils/string";
import { input } from "./input";
import * as A from "effect/Array";

const hasSequence = (n: number) => {
	const s = n.toString();
	const mid = Math.floor(s.length / 2);
	const before = s.slice(0, mid);
	const after = s.slice(mid);

	return before === after;
};

const hasNSequence = (n: number) => {
	const s = n.toString();

	for (let len = 1; len <= s.length / 2; len++) {
		// checks if the string length divide evenly by the chunk length
		if (s.length % len !== 0) continue;

		const chunk = s.slice(0, len);

		// checks if the chunk is repeated
		if (chunk.repeat(s.length / len) === s) {
			return true;
		}
	}

	return false;
};

const checkRangeForInvalidIds =
	(sequenceCheck: (n: number) => boolean) =>
		([from, to]: number[]) =>
			Array.from({ length: to - from + 1 }, (_, i) => from + i).filter(sequenceCheck);

const assignment1 = () =>
	pipe(
		input,
		split(","),
		A.map(split("-")),
		A.map(A.map(Number)),
		A.map(checkRangeForInvalidIds(hasSequence)),
		A.flatMap(identity),
		sum,
	);

const assignment2 = () =>
	pipe(
		input,
		split(","),
		A.map(split("-")),
		A.map(A.map(Number)),
		A.map(checkRangeForInvalidIds(hasNSequence)),
		A.flatMap(identity),
		sum,
	);

const Day = () => (
	<main>
		<h2>Day 2 </h2>
		<p> Part one: {assignment1()} </p>
		<p> Part two: {assignment2()} </p>
	</main>
);

export default Day;
