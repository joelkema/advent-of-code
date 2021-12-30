import { sum } from "../utils";
import { input } from "./input";

const openParentheses = ["(", "{", "[", "<"];
const closeParentheses = [")", "}", "]", ">"];

const lookup: Record<string, string> = {
    "(": ")",
    "{": "}",
    "[": "]",
    "<": ">",
};

const points: Record<string, number> = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};

const checkParentheses = (input: string) => {
    let stack = [];
    let illegal = [];
    const parentheses = input.split("");

    for (let i = 0; i < parentheses.length; i++) {
        const parenthese = parentheses[i];

        if (openParentheses.includes(parenthese)) {
            stack.push(parenthese);
        } else if (closeParentheses.includes(parenthese)) {
            const previous = stack.pop();

            if (previous && lookup[previous] !== parenthese) {
                illegal.push(parenthese);
                break; // we are only interested in the first illegal char (for now)
            }
        }
    }
    return illegal[0];
};

const getPoints = (parenthese?: string) => (parenthese ? points[parenthese] : 0);

// https://adventofcode.com/2021/day/10
export const assignment1 = () => sum(input.split("\n").map(checkParentheses).map(getPoints));

// https://adventofcode.com/2021/day/10#part2
export const assignment2 = () => {};
