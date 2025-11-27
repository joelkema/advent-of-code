import { sliceAndSum } from "../../utils";
import { filter } from "../../utils/array";
import input from "./input";

const assignment1 = () => filter((v: number, i) => v < input[i + 1])(input).length;

const assignment2 = () =>
	input.filter((_, i) => sliceAndSum(i + 1, i + 4)(input) > sliceAndSum(i, i + 3)(input)).length;

const Day = () => (
	<main>
		<h2>Day 1</h2>
		<p>Part one: {assignment1()}</p>
		<p>Part two: {assignment2()}</p>
	</main>
);

export default Day;
