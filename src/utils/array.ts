export const chunk = (arr: any[], chunkSize: number) =>
    Array.from({ length: arr.length / chunkSize }, () => arr.splice(0, chunkSize));

export const transpose = (matrix: string[][]) => {
    const [row] = matrix;
    return row.map((value, column) => matrix.map((row) => row[column]));
};

export const filter =
    <T>(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any) =>
    (arr: T[]) =>
        arr.filter(predicate, thisArg);

export const reduce =
    <TElement, TResult>(reducer: (result: TResult, el: TElement, index: number) => TResult, initialResult: TResult) =>
    (array: TElement[]): TResult =>
        array.reduce(reducer, initialResult);

export const max = (numbers: number[]) => Math.max(...numbers);

export const map =
    <TElement, TResult>(callbackfn: (value: TElement, index: number, array: TElement[]) => TResult, thisArg?: any) =>
    (arr: TElement[]): TResult[] =>
        arr.map(callbackfn, thisArg);

export const slice =
    <T>(start?: number | undefined, end?: number | undefined) =>
    (arr: T[]) =>
        arr.slice(start, end);

export const getColumn = <T>(column: number) => (matrix: T[][]) => matrix.map((v, i) => v[column]);