import { pipe } from "effect";
import { split } from "../../utils/string";
import { sum } from "../../utils";
import * as A from "effect/Array";
import { input } from "./input";
import { intersection } from "fp-ts/Array";
import * as N from "fp-ts/Number";
import * as O from "fp-ts/Option";

const getLines = (i: string) => pipe(i, split(/\n/));

const cards = getLines(input).map((line) =>
	line
		.replace(/Card [1-9]:/, "")
		.split(" | ")
		.map((card) => card.split(" "))
		.map((c) => c.filter((x) => !!x).map(Number)),
);

const getSameNumbers = (c: number[][][]) =>
	pipe(
		c,
		A.map((card) => {
			const [winningNumbers, yourNumbers] = card;

			return intersection(N.Eq)(winningNumbers, yourNumbers);
		}),
	);

const assignment1 = () =>
	pipe(
		cards,
		getSameNumbers,
		A.map((sameNumbers) =>
			pipe(
				sameNumbers.length,
				O.fromPredicate((length) => length > 0),
				O.fold(
					() => 0,
					(length) => (length === 1 ? 1 : Math.pow(2, length - 1)),
				),
			),
		),
		sum,
	);

const assignment2 = () => {
	const winningCards: number[] = [];

	const sameNumbers = pipe(cards, getSameNumbers);

	for (let i = 0; i < sameNumbers.length; i++) {
		const cardNumber = i + 1; // same as Card 1 etc.
		const sameNumber = sameNumbers[i];

		sameNumber.forEach((_, i) => {
			winningCards.push(cardNumber + i);
		});
	}

	for (let i = 0; i < winningCards.length; i++) {
		const cardNumber = winningCards[i];

		console.log(`Card ${cardNumber} is a winner!`);
		console.log(sameNumbers[cardNumber - 1]);
	}

	debugger;

	// while (iterator.length > 1) {}

	return 0;
};

const Day = () => (
	<main>
		<h2>Day 4</h2>
		<p>Part one: {assignment1()}</p>
		<p>Part two: {assignment2()}</p>
	</main>
);

export default Day;
