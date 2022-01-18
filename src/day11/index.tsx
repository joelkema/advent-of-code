import { cloneDeep, isNil } from "lodash";
import { useEffect, useRef, useState } from "react";
import { input1 } from "./input";

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
};

// https://adventofcode.com/2021/day/11
const Day = () => {
    // This ref seems unnecessary, but the for loop is 'faster' than react updating its state
    // This will guarantee us that the latest grid value is used
    const gridRef = useRef(input1);
    const flashesRef = useRef(0);
    const stepsRef = useRef(0);

    const [grid, setGrid] = useState(gridRef.current);
    const gridAmount = grid.length * grid[0].length;

    useEffect(() => {
        const runStep = async () => {
            while (true) {
                await delay(200);

                const [updatedGrid, amountOfFlashes] = step(gridRef.current);

                gridRef.current = updatedGrid;
                flashesRef.current += amountOfFlashes;
                stepsRef.current += 1;

                setGrid(updatedGrid);

                // Brute force part 2
                if (amountOfFlashes === gridAmount) {
                    break;
                }
            }
        };

        runStep();
    }, [gridAmount]);

    return (
        <main>
            <h2>Day 11</h2>
            <h3>Amount of flashes: {flashesRef.current}</h3>
            <h3>Amount of steps: {stepsRef.current}</h3>
            {grid.map((y) => (
                <>
                    {y.map((x) => {
                        return x === 0 ? <b>{x}&nbsp;</b> : <>{x}&nbsp;</>;
                    })}
                    <br />
                </>
            ))}
        </main>
    );
};

export default Day;
