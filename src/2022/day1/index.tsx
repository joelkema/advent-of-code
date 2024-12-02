import { Identity } from "../../shared/fp/identity";
import { pipe } from "effect";
import { isDefined } from "../../shared/predicates";
import { sortNumeric, sum } from "../../utils";
import { filter, map, max, slice } from "../../utils/array";
import { split } from "../../utils/string";
import { input } from "./input";

const splitByDoubleEnter = split(/\n\s*\n/);

const getCalories = (lines: string[]) =>
	map((line: string) =>
		pipe(
			line,
			split(/\n/),
			filter<string>(isDefined),
			map((a) => parseInt(a, 10)),
			sum,
		),
	)(lines);

const calories = Identity.of(input).map(splitByDoubleEnter).map(getCalories);

const fp1 = calories.map(max).emit();
const fp2 = calories.map(sortNumeric).map(slice(0, 3)).map(sum).emit();

const Day = () => (
	<main>
		<h2>Day 1</h2>
		<p>Part one: {fp1}</p>
		<p>Part two: {fp2}</p>
	</main>
);

export default Day;
