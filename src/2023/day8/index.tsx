import { pipe } from "fp-ts/lib/function";
import { split } from "../../utils/string";
import { input } from "./input";
import * as S from "fp-ts/lib/string";
import * as A from "fp-ts/lib/Array";
import * as O from "fp-ts/lib/Option";

type Node = {
    L: string;
    R: string;
};

type Network = {
    [key: string]: Node;
};

const getLines = (i: string) =>
    pipe(
        i,
        split(/\n/),
        A.filter((s: string) => s !== ""),
    );

const assignment1 = () => {
    const lines = getLines(input);
    const instructions = pipe(
        lines,
        A.head,
        O.getOrElse(() => ""),
        (s) => s.split("") as ("L" | "R")[],
    );

    const network = pipe(
        lines,
        A.tail,
        O.getOrElse<string[]>(() => []),
        A.reduce({} as Network, (prev, curr: string) => {
            const [nodeName, nextElemens] = curr.split(" = ");
            const [L, R] = nextElemens.replace(/[()]/g, "").split(", ");

            prev[nodeName] = {
                L,
                R,
            };

            return prev;
        }),
    );

    let currentNode = "AAA";
    let steps = 0;
    const maxInstructions = instructions.length;

    while (currentNode !== "ZZZ") {
        // if maxInstructions is 3, by the 4th iteration we take the 0th instruction
        const instruction = instructions[Math.floor(steps % maxInstructions)];

        console.log(instruction);

        currentNode = network[currentNode][instruction];
        steps++;
    }
    return steps;
};

const assignment2 = () => {
    return "Not implemented";
};

const Day = () => (
    <main>
        <h2>Day 8</h2>
        <p>Part one: {assignment1()}</p>
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
