import { isDefined, removeWhitespaces, sortNumeric, sum } from "../../utils";
import { input } from "./input";

type OpponentLetter = "A" | "B" | "C";
type YourLetter = "X" | "Y" | "Z";
type Letter = OpponentLetter | YourLetter;
type Shape = "rock" | "paper" | "scissors";
type Outcome = "win" | "draw" | "loss";

const lines = input.split(/\n/).filter(removeWhitespaces);

const shapes: Record<Letter, Shape> = {
    A: "rock",
    B: "paper",
    C: "scissors",
    X: "rock",
    Y: "paper",
    Z: "scissors",
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

const getScore = (shape: Shape, outcome: Outcome) => scoreShape[shape] + scoreOutcome[outcome];

export const assignment1 = () => {
    const scores = lines.map((line) => {
        const [opponent, you] = line.split(" ");

        const shapeOpponent = shapes[opponent as OpponentLetter];
        const shapeYou = shapes[you as YourLetter];

        const outcome = outcomeOfTheRound(shapeOpponent, shapeYou);

        return getScore(shapeYou, outcome);
    });

    return scores;
};

// export const assignment2 = () => sum(sortNumeric(splitted.reduce(getCalories, [])).slice(0, 3));

const Day = () => (
    <main>
        <h2>Day 1</h2>
        <p>Part one: {assignment1()}</p>
        {/* <p>Part two: {assignment2()}</p> */}
    </main>
);

export default Day;
