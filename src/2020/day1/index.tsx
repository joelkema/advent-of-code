import { pipe } from "effect";
import { split } from "../../utils/string";
import { input } from "./input";
import { sumProduct } from "../../utils";

const getLines = (i: string) =>
	pipe(
		i,
		split(/\n/),
		(a) => a.filter((s) => !!s),
		(a) => a.map(Number),
	);

const assignment1 = () => pipe(input, getLines, (a) => a.filter((n) => a.includes(2020 - n)), sumProduct);

const assignment2 = () =>
	pipe(input, getLines, (a) => a.filter((n) => a.some((m) => a.includes(2020 - n - m))), sumProduct);

const Day = () => {
	return (
		<main>
			<p>Part 1: {assignment1()}</p>
			<p>Part 2: {assignment2()}</p>
		</main>
	);
};

export default Day;
