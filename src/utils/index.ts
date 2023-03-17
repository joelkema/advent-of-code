import { pipe } from "../shared/logic";
import { reduce, slice } from "./array";

export const add = (accumulator: number, a: number) => accumulator + a;
export const multiply = (accumulator: number, a: number) => accumulator * a;

export const sum = reduce(add, 0);
export const sumProduct = reduce(multiply, 1);

export const sliceAndSum = <T>(start: number, end: number) => (input: number[]) => pipe(input, slice(start, end), reduce(add, 0))

export const difference = <T>(arr1: T[], arr2: T[]) =>
    arr1.filter((x) => !arr2.includes(x)).concat(arr2.filter((x) => !arr1.includes(x)));

export const swap = (obj: Record<any, any>): Record<any, any> =>
    Object.assign({}, ...Object.entries(obj).map(([a, b]) => ({ [b]: a })));

export const countChars = (s: string) =>
    s.split("").reduce((res: Record<string, number>, char) => ((res[char] = (res[char] || 0) + 1), res), {});

export const sortNumeric = (array: number[]) => array.sort((a, b) => b - a);
export const sortAlphabeticly = (s: string) => s.split("").sort().join("");

export const median = (arr: number[]) => {
    const mid = Math.floor(arr.length / 2),
        sorted = sortNumeric(arr);
    return arr.length % 2 !== 0 ? sorted[mid] : sorted[mid - 1];
};

export const removeWhitespaces = (str: string): string => str.replace(/\s/g, "");

export const getInput = () =>
    fetch("/input.txt")
        .then((response) => response.text())
        .then((text) => console.log(text));

export const parseStringToInt = (s: string) => parseInt(s, 10);