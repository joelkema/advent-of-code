export const chunk = (arr: any[], chunkSize: number) =>
    Array.from({ length: arr.length / chunkSize }, () => arr.splice(0, chunkSize));

export const transpose = (matrix: string[][]) => {
    const [row] = matrix;
    return row.map((value, column) => matrix.map((row) => row[column]));
};
