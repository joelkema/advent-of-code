import { pipe } from "effect";
import { not } from "../../shared/logic";
import { split } from "../../utils/string";
import { input } from "./input";
import * as A from "effect/Array";

const getLines = (i: string) => pipe(i, split(/\n/), A.filter(not((s) => s === "")));

type Instruction = {
    action: "turn on" | "turn off" | "toggle";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

// turn on or off the lights in the grid
const toggleTheLights = (grid: number[][], { x1, x2, y1, y2, action }: Instruction) => {
    for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
            if (action === "turn on") grid[i][j] = 1;
            if (action === "turn off") grid[i][j] = 0;
            if (action === "toggle") grid[i][j] = grid[i][j] === 1 ? 0 : 1;
        }
    }
};

// increase or descrease the brightness of the lights in the grid
const increaseBrightness = (grid: number[][], { x1, x2, y1, y2, action }: Instruction) => {
    for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
            if (action === "turn on") grid[i][j] += 1;
            if (action === "turn off") grid[i][j] = Math.max(0, grid[i][j] - 1);
            if (action === "toggle") grid[i][j] += 2;
        }
    }
};

// convert the line to an instruction object
// e.g. "turn on 887,9 through 959,629" => { turnOn: true, x1: 887, y1: 9, x2: 959, y2: 629 }
const lineToInstruction = (line: string): Instruction => {
    console.log(line);

    const matches = line.match(/(\d+)/g);
    const action = line.includes("turn on") ? "turn on" : line.includes("turn off") ? "turn off" : "toggle";

    if (!matches) {
        return { action, x1: 0, y1: 0, x2: 0, y2: 0 };
    }

    const [x1, y1, x2, y2] = matches.map(Number);

    return { action, x1, y1, x2, y2 };
};

const assignment1 = () => {
    // create a 1000x1000 grid
    const grid = Array.from({ length: 1000 }, () => Array.from({ length: 1000 }, () => 0));

    const lines = getLines(input);
    const instructions = lines.map(lineToInstruction);

    instructions.forEach((instruction) => toggleTheLights(grid, instruction));

    return grid.flat().reduce((acc, curr) => acc + curr, 0);
};

const assignment2 = () => {
    // create a 1000x1000 grid
    const grid = Array.from({ length: 1000 }, () => Array.from({ length: 1000 }, () => 0));

    const lines = getLines(input);
    const instructions = lines.map(lineToInstruction);

    instructions.forEach((instruction) => increaseBrightness(grid, instruction));

    return grid.flat().reduce((acc, curr) => acc + curr, 0);
};

const Day = () => {
    return (
        <main>
            <p>Part 1: {assignment1()}</p>
            <p>Part 2: {assignment2()}</p>
        </main>
    );
};

export default Day;
