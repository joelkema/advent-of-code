import { sum } from "../utils";
import { numbers, boards } from "./input";

const getColumn = (matrix: number[][], n: number) => matrix.map((row) => row[n]);

const isWinningLine = (calledNumbers: number[]) => (line: number[]) =>
    line.findIndex((number) => !calledNumbers.includes(number)) === -1;

const checkForBingo = (matrix: number[][], calledNumbers: number[]) =>
    matrix.filter(isWinningLine(calledNumbers)).length;

const hasBingo = (calledNumbers: number[]) => (board: number[][]) =>
    checkForBingo(board, calledNumbers) ||
    checkForBingo(
        board.map((_, i) => getColumn(board, i)),
        calledNumbers,
    );

const checkBoards = (boards: number[][][], calledNumbers: number[]) => {
    if (calledNumbers.length < 5) return false;

    const board = boards.find(hasBingo(calledNumbers));

    return board;
};

export const assignment1 = () => {
    let bingo = false;
    let finalScore = 0;
    let index = 1;

    while (!bingo) {
        const calledNumbers = numbers.slice(0, index);
        const board = checkBoards(boards, calledNumbers);

        if (board) {
            bingo = true;

            // Start by finding the sum of all unmarked numbers on that board;
            const unmarkedNumbers = board.flatMap((r) => r.filter((number) => !calledNumbers.includes(number)));

            // Then, multiply that sum by the number that was just called when the board won, to get the final score.
            finalScore = calledNumbers[calledNumbers.length - 1] * sum(unmarkedNumbers);
        }

        index++;
    }

    return finalScore;
};
