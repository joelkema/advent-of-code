import { cloneDeep, isNil } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { input1, testInput2 as input } from "./input";

const flash = (grid: number[][], flashes: string[], y: number, x: number) => {
    increaseEnergyLevel(grid, flashes, y - 1, x); // up
    increaseEnergyLevel(grid, flashes, y - 1, x - 1); // up left
    increaseEnergyLevel(grid, flashes, y - 1, x + 1); // up right
    increaseEnergyLevel(grid, flashes, y + 1, x); // down
    increaseEnergyLevel(grid, flashes, y + 1, x - 1); // down left
    increaseEnergyLevel(grid, flashes, y + 1, x + 1); // down right
    increaseEnergyLevel(grid, flashes, y, x - 1); // left
    increaseEnergyLevel(grid, flashes, y, x + 1); // right
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const increase = (level: number) => (level + 1 > 9 ? 0 : level + 1);

const increaseEnergyLevel = (grid: number[][], flashes: string[], y: number, x: number) => {
    if (y < 0 || x < 0) return;

    if (isNil(grid[y]) || isNil(grid[y][x])) return;

    if (grid[y][x] === 9) {
        grid[y][x] = 0;
        flashes.push(`${y}${x}`);
        flash(grid, flashes, y, x);
    }

    if (!flashes.includes(`${y}${x}`)) grid[y][x]++;
};

const step = (grid: number[][]): [number[][], number] => {
    const flashes: string[] = [];

    const clone = cloneDeep(grid);

    for (let y = 0; y < clone.length; y++) {
        const row = clone[y];

        for (let x = 0; x < row.length; x++) {
            increaseEnergyLevel(clone, flashes, y, x);
        }
    }

    return [clone, flashes.length];

    // for (let y = 0; y < grid.length; y++) {
    //     const row = grid[y];

    //     for (let x = 0; x < row.length; x++) {
    //         increaseEnergyLevel(grid, flashes, y, x);
    //     }
    // }
};

// https://adventofcode.com/2021/day/11
const Day = () => {
    // This ref seems unnecessary, but the for loop is 'faster' than react updating its state
    // This will guarantee us that the latest grid value is used
    const gridRef = useRef(input1);
    const flashesRef = useRef(0);
    const syncRef = useRef(0);

    const [grid, setGrid] = useState(gridRef.current);
    const gridAmount = grid.length * grid[0].length;

    const runStep = async () => {
        // 334 = answer for part 2
        for (let i = 1; i <= 334; i++) {
            await delay(200);

            const [updatedGrid, amountOfFlashes] = step(gridRef.current);

            gridRef.current = updatedGrid;
            flashesRef.current += amountOfFlashes;

            setGrid(updatedGrid);

            // Brute force part 2
            // if (amountOfFlashes === gridAmount) {
            //     debugger;
            // }
        }
    };

    useEffect(() => {
        runStep();
    }, []);

    return (
        <main>
            <h2>Day 11</h2>
            <h3>Amount of flashes: {flashesRef.current}</h3>
            {grid.map((y) => (
                <>
                    {y.map((x) => {
                        return x === 0 ? <b>{x}&nbsp;</b> : <>{x}&nbsp;</>;
                    })}
                    <br />
                </>
            ))}
            <p>Part one:</p>
        </main>
    );
};

export default Day;
