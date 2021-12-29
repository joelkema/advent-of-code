const add = (accumulator: number, a: number) => accumulator + a;

export const sum = (array: number[]) => array.reduce(add, 0);
