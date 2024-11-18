import { input } from "./input";
import { v4 as uuidv4 } from "uuid";

// const input = "^>v<";

type Grid = string[][];

// use uuid
function generateKey() {
    return uuidv4();
}

type Presents = Record<string, number>;

const givePresents = (grid: Grid, presents: Presents, route: string[]) => {
    let x = 0;
    let y = 0;

    for (let i = 0; i < route.length; i++) {
        const direction = route[i];
        let neighbourId = generateKey();

        if (direction === "^") y = y - 1;
        if (direction === ">") x = x + 1;
        if (direction === "v") y = y + 1;
        if (direction === "<") x = x - 1;

        if (!grid[y]) {
            grid[y] = [];
        }

        if (!grid[y][x]) {
            grid[y][x] = neighbourId;
        } else {
            neighbourId = grid[y][x];
        }

        // add a present to where we are going
        presents[neighbourId] = presents[neighbourId] ? presents[neighbourId] + 1 : 1;
    }
};

const assignment1 = () => {
    const presents: Presents = {};

    const grid: Grid = [];

    grid[0] = [];
    grid[0][0] = generateKey();

    // the first one got a lucky present
    presents[grid[0][0]] = 1;

    givePresents(grid, presents, input.split(""));

    const atLeastOne = Object.values(presents).filter((n) => n > 0).length;

    return atLeastOne;
};

const assignment2 = () => {
    const presents: Presents = {};

    const grid: Grid = [];

    grid[0] = [];
    grid[0][0] = generateKey();

    // the first one got a lucky present
    presents[grid[0][0]] = 1;

    let santaRoute = "";
    let roboSantaRoute = "";

    for (let i = 0; i < input.length; i++) {
        if (i % 2 === 0) {
            santaRoute += input[i]; // Even index
        } else {
            roboSantaRoute += input[i]; // Uneven index
        }
    }

    givePresents(grid, presents, santaRoute.split(""));
    givePresents(grid, presents, roboSantaRoute.split(""));

    const atLeastOne = Object.values(presents).filter((n) => n > 0).length;

    return atLeastOne;
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
