import { dots, foldInstructions } from "./input";

const empty = ".";
const dot = "#";

const sort = (array: number[]) => array.sort((a, b) => b - a);

const getMaxY = (array: number[][]) => sort(array.map((arr) => arr[1]))[0];
const getMaxX = (array: number[][]) => sort(array.map((arr) => arr[0]))[0];

const generatePaper = (dots: number[][]): string[][] => {
    const maxX = getMaxX(dots);
    const maxY = getMaxY(dots);

    const grid = [...Array(maxX + 1)].map((_) => Array(maxY + 1).fill(empty));

    for (let i = 0; i < dots.length; i++) {
        const [x, y] = dots[i];
        grid[x][y] = dot;
    }

    return grid;
};

export const getPrint = (paper: string[][]) => {
    let print = "";
    const maxY = paper[0].length - 1;

    for (let y = 0; y < maxY; y++) {
        for (let x = 0; x < paper.length; x++) {
            print += paper[x][y];
        }
        print += "\r\n";
    }
    return print;
};

const foldY = (paper: string[][], amount: number): string[][] => {
    const foldedPaper: string[][] = [];
    const maxY = amount * 2;

    for (let x = 0; x < paper.length; x++) {
        if (!foldedPaper[x]) foldedPaper[x] = [];

        for (let y = maxY; y >= amount; y--) {
            const yToUpdate = maxY - y;
            const newValue = paper[x][y];
            const oldValue = paper[x][yToUpdate];

            foldedPaper[x][yToUpdate] = oldValue === dot ? oldValue : newValue;
        }
    }
    return foldedPaper;
};

const foldX = (paper: string[][], amount: number): string[][] => {
    const foldedPaper: string[][] = [];

    const maxX = paper.length - 1;
    const maxY = paper[0].length;

    for (let y = 0; y < maxY; y++) {
        for (let x = maxX; x > amount; x--) {
            const xToUpdate = maxX - x;
            const newValue = paper[x][y];
            const oldValue = paper[xToUpdate][y];

            if (!foldedPaper[xToUpdate]) foldedPaper[xToUpdate] = [];

            foldedPaper[xToUpdate][y] = oldValue === dot ? oldValue : newValue;
        }
    }

    return foldedPaper;
};

const fold = (paper: string[][], instruction: string) => {
    const [axis, amount] = instruction.split("=");

    return axis === "y" ? foldY(paper, Number(amount)) : foldX(paper, Number(amount));
};

export const assignment1 = () => {
    const unfoldedPaper = generatePaper(dots);

    let foldedPaper = unfoldedPaper;

    foldInstructions.slice(0, 1).forEach((instruction) => {
        foldedPaper = fold(foldedPaper, instruction);
    });

    const total = foldedPaper.reduce((count, array) => count + array.filter((y) => y === dot).length, 0);

    return total;
};

export const assignment2 = () => {
    const unfoldedPaper = generatePaper(dots);

    let foldedPaper = unfoldedPaper;

    foldInstructions.forEach((instruction) => {
        foldedPaper = fold(foldedPaper, instruction);
    });

    return getPrint(foldedPaper);
};
