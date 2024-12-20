import { pipe } from "effect";
import { split } from "../../utils/string";
import { input } from "./input";
import { sortNumeric, sum } from "../../utils";

const getLines = (i: string) =>
	pipe(
		i,
		split(/\n/),
		(a) => a.filter((s) => !!s),
		(a) => a.map(split("   ")),
	);

const assignment1 = () => {
	const lines = getLines(input);
	const leftColumn = sortNumeric(
		lines.map((l) => Number(l[0])),
		"asc",
	);
	const rightColumn = sortNumeric(
		lines.map((l) => Number(l[1])),
		"asc",
	);

	const distances = leftColumn.map((d, i) => {
		return d > rightColumn[i] ? d - rightColumn[i] : rightColumn[i] - d;
	});

	return sum(distances);
};

const assignment2 = () => {
	const lines = getLines(input);
	const leftColumn = sortNumeric(
		lines.map((l) => Number(l[0])),
		"asc",
	);
	const rightColumn = sortNumeric(
		lines.map((l) => Number(l[1])),
		"asc",
	);

	const similarities: Record<number, number> = {};

	for (let i = 0; i < rightColumn.length; i++) {
		similarities[rightColumn[i]] = (similarities[rightColumn[i]] || 0) + 1;
	}

	const similarity = leftColumn.map((d) => {
		return d * (similarities[d] || 0);
	});

	return sum(similarity);
};

const Day = () => (
	<main>
		<h2>Day 1 </h2>
		<p> Part one: {assignment1()} </p>
		<p> Part two: {assignment2()} </p>
	</main>
);

export default Day;
