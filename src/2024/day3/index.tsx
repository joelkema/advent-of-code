import { pipe, Array as A, String as S } from "effect";

const getLines = (i: string): number[][] =>
	pipe(
		i,

		S.split(/\n/),
		A.filter((s) => !!s),
		A.map(S.split(" ")),
		A.map(A.map(Number)),
	);

const assignment1 = () => null;

const Day = () => (
	<main>
		<h2>Day 2 </h2>
		<p> Part one: {assignment1()} </p>
		{/* <p> Part two: {assignment2()} </p> */}
	</main>
);

export default Day;
