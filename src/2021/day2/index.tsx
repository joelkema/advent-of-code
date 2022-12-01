import input from "./input";

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
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
