import { cloneDeep } from "lodash";
import { transpose } from "../../utils/array";
import { getNewLines, replaceAll } from "../../utils/string";
import { input } from "./input";

type Command = {
    amount: number;
    from: number;
    to: number;
};

const [cargoInputStr, commandsStr] = input.split(/\n\s*\n/);

// remove numbered last line
const cargoLines = getNewLines(cargoInputStr).slice(0, -1);

const commands: Command[] = getNewLines(commandsStr).map((cmdStr) => {
    const arr = cmdStr.match(/[0-9]+/g)!;

    return {
        amount: parseInt(arr[0]),
        from: parseInt(arr[1]),
        to: parseInt(arr[2]),
    };
});

// first make a n * n matrix so that the stacks get placed right
// then remove the empty stacks
const initialStacks = transpose(
    cargoLines
        .map(replaceAll("    ", "[]"))
        .map(replaceAll(" ", ""))
        .map(replaceAll("][", "],["))
        .map((s) => s.replace(/\[|\]/g, "").split(",")),
).map((s) => s.filter((a) => a !== ""));

const move =
    (stacks: string[][], reverse = true) =>
    ({ amount, from, to }: Command) => {
        const updatedStacks = cloneDeep(stacks);

        // commands are 1 based
        const fromIndex = from - 1;
        const toIndex = to - 1;

        const cratesToMove =
            amount === 1 ? [updatedStacks[fromIndex].shift()!] : updatedStacks[fromIndex].splice(0, amount);

        console.log(`move ${cratesToMove.join(",")} from ${from} to ${to}`);

        const crates = reverse ? cratesToMove.reverse() : cratesToMove;
        updatedStacks[toIndex] = [...crates, ...updatedStacks[toIndex]];

        console.log("after move");
        console.log(updatedStacks);

        return updatedStacks;
    };

const assignment = (reverse = true) => {
    let stacks = initialStacks;

    for (let i = 0; i < commands.length; i++) {
        stacks = move(stacks, reverse)(commands[i]);
    }

    return stacks.map(([first]) => first).join("");
};

const Day = () => (
    <main>
        <h2>Day 5</h2>
        <p>Part one: {assignment()}</p>
        <p>Part two: {assignment(false)}</p>
    </main>
);

export default Day;
