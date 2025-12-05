import { pipe } from "effect";
import * as A from "effect/Array";
import { split } from "../../utils/string";
import { input } from "./input";

type Range = {
	from: bigint;
	to: bigint;
};

type Ingredients = {
	idRanges: Range[];
	availableIds: number[];
};

const getIngredients = (i: string) => {
	const [ranges, ids] = i.split("\n\n").map((a) => a.split("\n").filter((a) => a !== ""));

	const ingredients: Ingredients = {
		idRanges: ranges.map((a) => {
			const [from, to] = a.split("-");
			return {
				from: BigInt(from),
				to: BigInt(to),
			};
		}),
		availableIds: ids.map(Number),
	};

	return ingredients;
};

const assignment1 = () => {
	const ingredients = getIngredients(input);

	// now check which of the available id are in the set
	const result = ingredients.availableIds.filter((a) => {
		return ingredients.idRanges.some((range) => range.from <= a && a <= range.to);
	});

	return result.length;
};

const assignment2 = () => {
	const ingredients = getIngredients(input);

	// sort by start of range
	const sorted = [...ingredients.idRanges].sort((a, b) => (a.from < b.from ? -1 : a.from > b.from ? 1 : 0));

	const merged: Range[] = [];

	for (const r of sorted) {
		// first range can be pushed
		if (merged.length === 0) {
			merged.push({ ...r });
			continue;
		}

		const last = merged[merged.length - 1];

		// overlap or directly adjacent
		if (r.from <= last.to) {
			if (r.to > last.to) {
				last.to = r.to;
			}
		} else {
			merged.push({ ...r });
		}
	}

	const totalUniqueNumbers = merged.reduce((sum, r) => sum + (r.to - r.from + 1n), 0n);

	return totalUniqueNumbers.toString();
};

const Day = () => (
	<main>
		<h2>Day 5</h2>
		<p> Part one: {assignment1()} </p>
		<p> Part two: {assignment2()} </p>
	</main>
);

export default Day;
