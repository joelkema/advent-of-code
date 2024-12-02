import { pipe } from "effect";
import { split } from "../../utils/string";
import { inputDay1, inputDay2 } from "./input";
import * as A from "effect/Array";
import * as O from "effect/Option";

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

const getZNodePath = (network: Network, instructions: ("L" | "R")[], nodeName: string) => {
    let currentNodes = network[nodeName];
    let steps = 0;
    const maxInstructions = instructions.length;

    for (let i = 0; i < 10000000; i++) {
        const instruction = instructions[Math.floor(steps % maxInstructions)];
        currentNodes = network[currentNodes[instruction]];
        steps++;
    }
};

const assignment2 = () => {
    const instructions = mapInputToInstructions(inputDay2);
    const network = mapInputToNetwork(inputDay2);

    // start at every node that ends with A, can be multiple
    let currentNodes = ["FQA"];
    let steps = 0;
    const maxInstructions = instructions.length;

    debugger;

    //     0
    // :
    // "FQA"
    // 1
    // :
    // "JSA"
    // 2
    // :
    // "GJA"
    // 3
    // :
    // "PBA"
    // 4
    // :
    // "AAA"
    // 5
    // :
    // "NNA"

    // follow all of the paths at the same time until they all simultaneously end up at nodes that end with Z
    while (currentNodes.filter((k) => k.endsWith("Z")).length < 3) {
        // now with a for loop
        for (let i = 0; i < currentNodes.length; i++) {
            const currentNode = currentNodes[i];
            const instruction = instructions[Math.floor(steps % maxInstructions)];
            currentNodes[i] = network[currentNode][instruction];
        }

        steps++;
    }

    console.log(currentNodes);

    debugger;

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
