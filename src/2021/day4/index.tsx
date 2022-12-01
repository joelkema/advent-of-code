import { sum } from "../../utils";
import { numbers, boards } from "./input";

const getColumns = (matrix: number[][], n: number) => matrix.map((row) => row[n]);

const isWinningLine = (calledNumbers: number[]) => (line: number[]) =>
    line.findIndex((number) => !calledNumbers.includes(number)) === -1;

const checkForBingo = (matrix: number[][], calledNumbers: number[]) =>
    matrix.filter(isWinningLine(calledNumbers)).length;

const hasBingo = (calledNumbers: number[]) => (board: number[][]) =>
    checkForBingo(board, calledNumbers) ||
    checkForBingo(
        board.map((_, i) => getColumns(board, i)),
        calledNumbers,
    );

const findBoardWithBingo = (boards: number[][][], calledNumbers: number[]) =>
    calledNumbers.length >= 5 && boards.find(hasBingo(calledNumbers));

const calculateFinalScore = (board: number[][], calledNumbers: number[]) => {
    // Start by finding the sum of all unmarked numbers on that board;
    const unmarkedNumbers = board.flatMap((r) => r.filter((number) => !calledNumbers.includes(number)));

    // Then, multiply that sum by the number that was just called when the board won, to get the final score.
    return calledNumbers[calledNumbers.length - 1] * sum(unmarkedNumbers);
};

const assignment1 = () => {
    let bingo = false;
    let finalScore = 0;
    let index = 1;

    while (!bingo) {
        const calledNumbers = numbers.slice(0, index);
        const winningBoards = findBoardWithBingo(boards, calledNumbers);

        if (winningBoards) {
            bingo = true;

            finalScore = calculateFinalScore(winningBoards, calledNumbers);
        }

        index++;
    }

    return finalScore;
};

const assignment2 = () => {
    let boardsWithBingo: number[][][] = [];
    const boardsToCheck = () => boards.filter((b) => !boardsWithBingo.includes(b));
    const allScores: number[] = [];

    for (let i = 1; i <= numbers.length; i++) {
        const calledNumbers = numbers.slice(0, i);

        const winningBoards = findBoardWithBingo(boardsToCheck(), calledNumbers);

        console.log(boardsToCheck().length);

        if (winningBoards) {
            // console.log(winningBoards);
            console.log(`WON BY`);
            console.log(calledNumbers[calledNumbers.length - 1]);
            console.log(`calledNumbers`);
            console.log(calledNumbers);

            boardsWithBingo = boardsWithBingo.concat(winningBoards);
        }
    }

    return allScores[allScores.length - 1];
};

const Day = () => (
    <main>
        <h2>Day 4</h2>
        <p>Part one: {assignment1()}</p>
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
