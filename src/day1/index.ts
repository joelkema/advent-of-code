import input from "./input";

const add = (accumulator: number, a: number) => accumulator + a;
const sliceAndSum = (start: number, end: number) => input.slice(start, end).reduce(add, 0);

export const assignment1 = () => input.filter((v, i) => v < input[i + 1]).length;

export const assignment2 = () => input.filter((v, i) => sliceAndSum(i + 1, i + 4) > sliceAndSum(i, i + 3)).length;
