import input from "./input";

export const assignment1 = () => {
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

export const assignment2 = () => {
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
