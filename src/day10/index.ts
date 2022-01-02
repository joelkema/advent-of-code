import { median, sortNumeric, sum } from "../utils";
import { input } from "./input";

const openParentheses = ["(", "{", "[", "<"];
const closeParentheses = [")", "}", "]", ">"];

const lookup: Record<string, string> = {
    "(": ")",
    "{": "}",
    "[": "]",
    "<": ">",
};

const partOnePoints: Record<string, number> = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};

const partTwoPoints: Record<string, number> = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
};

const checkCorrupted = (s: string) => {
    let stack = [];
    let illegal = "";

    for (let i = 0; i < s.length; i++) {
        const parenthese = s[i];

        if (openParentheses.includes(parenthese)) {
            stack.push(parenthese);
        } else if (closeParentheses.includes(parenthese)) {
            const previous = stack.pop();

            if (previous && lookup[previous] !== parenthese) {
                illegal = parenthese;
                break; // we are only interested in the first illegal char
            }
        }
    }
    return illegal;
};

const checkMissing = (s: string) => {
    let stack: string[] = [];

    for (let i = 0; i < s.length; i++) {
        const parenthese = s[i];

        if (openParentheses.includes(parenthese)) {
            stack.push(parenthese);
        } else if (closeParentheses.includes(parenthese)) {
            const match = stack.pop();
            const expected = lookup[match!];

            // Discard corrupted lines
            if (match && expected !== parenthese) {
                stack = [];
                break;
            }
        }
    }

    // reverse is important for score calculation
    return stack.map((a) => lookup[a]).reverse();
};

const getPoints = (points: Record<string, number>) => (parenthese?: string) => parenthese ? points[parenthese] : 0;

// https://adventofcode.com/2021/day/10
export const assignment1 = () => sum(input.split("\n").map(checkCorrupted).map(getPoints(partOnePoints)));

// https://adventofcode.com/2021/day/10#part2
export const assignment2 = () => {
    const scores = [];

    const missingLines = input
        .split("\n")
        .map(checkMissing)
        .filter((x) => x.length);

    for (let i = 0; i < missingLines.length; i++) {
        const line = missingLines[i];
        let score = 0;

        for (let i = 0; i < line.length; i++) {
            const parenthese = line[i];

            score = score * 5 + getPoints(partTwoPoints)(parenthese);
        }

        scores.push(score);
    }

    return median(scores);
};

console.log(assignment1());
console.log(assignment2());
