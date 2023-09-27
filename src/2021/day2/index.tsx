import * as IO from "fp-ts/lib/IO";
import * as Array from "fp-ts/lib/Array";
import input from "./input";
import { pipe } from "fp-ts/lib/function";
import * as Either from 'fp-ts/Either';

type Command = "forward" | "down" | "up";

interface CommandWithAmount {
  command: Command;
  amount: number;
}

function parseInput(input: string[]): CommandWithAmount[] {
  return input.map((item) => {
    const [command, amount] = item.split(" ");
    return { command: command as Command, amount: Number(amount) };
  });
}

const forward: (amount: number) => (state: State) => State = (amount) => (state) => ({
  ...state,
  horizontalPosition: state.horizontalPosition + amount,
});

const down: (amount: number) => (state: State) => State = (amount) => (state) => ({
  ...state,
  depth: state.depth + amount,
});

const up: (amount: number) => (state: State) => State = (amount) => (state) => ({
  ...state,
  depth: state.depth - amount,
});

const commandMapping: Record<Command, (amount: number) => (state: State) => State> = {
  forward,
  down,
  up,
};

interface State {
  horizontalPosition: number;
  depth: number;
}

const initialState: State = {
  horizontalPosition: 0,
  depth: 0,
};

// const handleCommand = ({ command, amount }: CommandWithAmount): (state: State) => State =>
//   commandMapping[command](amount);

// const calculateResult: (commands: CommandWithAmount[]) => number = (commands) => {
//     const finalState = pipe(
//         commands,
//         Array.map(handleCommand) // Apply the commands to update the state.
//     );

//   return finalState.horizontalPosition * finalState.depth;
// };

// // Example usage:

// const commands = parseInput(input);
// const result = calculateResult(commands);
// console.log(result);



const assignment1 = () => {
    let horizontalPosition = 0;
    let depth = 0;

    for (let i = 0; i < input.length; i++) {
        const [command, amount] = input[i].split(" ");

        if (command === "forward") {
            horizontalPosition += Number(amount);
        }
        if (command === "down") {
            depth += Number(amount);
        }
        if (command === "up") {
            depth -= Number(amount);
        }
    }

    return horizontalPosition * depth;
};

const assignment2 = () => {
    let horizontalPosition = 0;
    let depth = 0;
    let aim = 0;

    for (let i = 0; i < input.length; i++) {
        const [command, amount] = input[i].split(" ");

        if (command === "forward") {
            horizontalPosition += Number(amount);
            depth += aim * Number(amount);
        }
        if (command === "down") {
            aim += Number(amount);
        }
        if (command === "up") {
            aim -= Number(amount);
        }
    }

    return horizontalPosition * depth;
};

const Day = () => (
    <main>
        <h2>Day 2</h2>
        <p>Part one: {assignment1()}</p>
        {/* <p>Part one: {assignment1fp()}</p> */}
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
