import { pipe } from "fp-ts/lib/function";
import { split } from "../../utils/string";
import { inputDay1, inputDay2 } from "./input";
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

const mapInputToNetwork = (input: string): Network =>
    pipe(
        getLines(input),
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

const mapInputToInstructions = (input: string): ("L" | "R")[] =>
    pipe(
        getLines(input),
        A.head,
        O.getOrElse(() => ""),
        (s) => s.split("") as ("L" | "R")[],
    );

const assignment1 = () => {
    const instructions = mapInputToInstructions(inputDay1);
    const network = mapInputToNetwork(inputDay1);

    let currentNode = "AAA";
    let steps = 0;
    const maxInstructions = instructions.length;

    while (currentNode !== "ZZZ") {
        const instruction = instructions[Math.floor(steps % maxInstructions)];

        console.log(instruction);

        currentNode = network[currentNode][instruction];
        steps++;
    }
    return steps;
};

const assignment2 = () => {
    const instructions = mapInputToInstructions(inputDay2);
    const network = mapInputToNetwork(inputDay2);

    // start at every node that ends with A, can be multiple
    let currentNodes = Object.keys(network).filter((k) => k.endsWith("A"));
    let steps = 0;
    const maxInstructions = instructions.length;

    // follow all of the paths at the same time until they all simultaneously end up at nodes that end with Z
    while (currentNodes.filter((k) => k.endsWith("Z")).length !== currentNodes.length) {
        // now with a for loop
        for (let i = 0; i < currentNodes.length; i++) {
            const currentNode = currentNodes[i];
            const instruction = instructions[Math.floor(steps % maxInstructions)];
            currentNodes[i] = network[currentNode][instruction];
        }

        steps++;
    }
    return steps;
};

const Day = () => (
    <main>
        <h2>Day 8</h2>
        <p>Part one: {assignment1()}</p>
        {/* <p>Part two: {assignment2()}</p> */}
    </main>
);

export default Day;
