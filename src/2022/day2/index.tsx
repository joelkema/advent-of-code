import { Identity } from "../../shared/fp/identity";
import { pipe } from "effect";
import { removeWhitespaces, sum } from "../../utils";
import { map } from "../../utils/array";
import { split } from "../../utils/string";
import { input } from "./input";

type OpponentLetter = "A" | "B" | "C";
type YourLetter = "X" | "Y" | "Z";
type Letter = OpponentLetter | YourLetter;
type Shape = "rock" | "paper" | "scissors";
type Outcome = "win" | "draw" | "loss";

const format = (i: string) => pipe(i, split(/\n/), map(removeWhitespaces));

const lines = input.split(/\n/).filter(removeWhitespaces);

const shapes: Record<Letter, Shape> = {
	A: "rock",
	B: "paper",
	C: "scissors",
	X: "rock",
	Y: "paper",
	Z: "scissors",
};

const outcomes: Record<YourLetter, Outcome> = {
	X: "loss",
	Y: "draw",
	Z: "win",
};

const scoreShape: Record<Shape, number> = {
	rock: 1,
	paper: 2,
	scissors: 3,
};

const scoreOutcome: Record<Outcome, number> = {
	win: 6,
	draw: 3,
	loss: 0,
};

const outcomeOfTheRound = (opponent: Shape, you: Shape): Outcome => {
	const scoreOpponent = scoreShape[opponent];
	const scoreYou = scoreShape[you];

	if (opponent === you) return "draw";
	if (opponent === "scissors" && you === "rock") return "win";
	if (opponent === "rock" && you === "scissors") return "loss";

	if (scoreYou > scoreOpponent) return "win";
	return "loss";
};

const calculateScore = (shape: Shape, outcome: Outcome) => scoreShape[shape] + scoreOutcome[outcome];

const getOutcomeBasedShape = (opponent: Shape, yourLetter: YourLetter): Shape => {
	const outcome = outcomes[yourLetter];

	if (outcome === "draw") return opponent;
	if (outcome === "win") {
		if (opponent === "rock") return "paper";
		if (opponent === "paper") return "scissors";
		return "rock";
	}

	if (opponent === "rock") return "scissors";
	if (opponent === "paper") return "rock";
	return "paper";
};

const fptje = (mapper: (opponent: Shape, yourLetter: YourLetter) => Shape) => {
	const localFn = (line: string) => {
		const [opponent, you] = line.split(" ");

		const opponentsShape = shapes[opponent as OpponentLetter];
		const yourShape = mapper(opponentsShape, you as YourLetter);

		const outcome = outcomeOfTheRound(opponentsShape, yourShape);

		return calculateScore(yourShape, outcome);
	};

	const scores = Identity.of(input).map(format).map(map(localFn)).emit();

	return sum(scores);
};

const getTotalScore = (mapper: (opponent: Shape, yourLetter: YourLetter) => Shape) => {
	const scores = lines.map((line) => {
		const [opponent, you] = line.split(" ");

		const opponentsShape = shapes[opponent as OpponentLetter];
		const yourShape = mapper(opponentsShape, you as YourLetter);

		const outcome = outcomeOfTheRound(opponentsShape, yourShape);

		return calculateScore(yourShape, outcome);
	});

	return sum(scores);
};

export const assignment1 = () => getTotalScore((_, you) => shapes[you]);
export const assignment2 = () => getTotalScore(getOutcomeBasedShape);

const Day = () => (
	<main>
		<h2>Day 2</h2>
		<p>Part one: {assignment1()}</p>
		<p>Part two: {assignment2()}</p>
	</main>
);

export default Day;
