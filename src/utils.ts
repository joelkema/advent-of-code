const add = (accumulator: number, a: number) => accumulator + a;
const multiply = (accumulator: number, a: number) => accumulator * a;

export const sum = (array: number[]) => array.reduce(add, 0);
export const sumProduct = (array: number[]) => array.reduce(multiply, 1);

export const difference = <T>(arr1: T[], arr2: T[]) =>
    arr1.filter((x) => !arr2.includes(x)).concat(arr2.filter((x) => !arr1.includes(x)));

export const swap = (obj: Record<any, any>): Record<any, any> =>
    Object.assign({}, ...Object.entries(obj).map(([a, b]) => ({ [b]: a })));

export const countChars = (s: string) =>
    s.split("").reduce((res: Record<string, number>, char) => ((res[char] = (res[char] || 0) + 1), res), {});

export const sortNumeric = (array: number[]) => array.sort((a, b) => b - a);
export const sortAlphabeticly = (s: string) => s.split("").sort().join("");
