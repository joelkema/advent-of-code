export const chunk = (arr: any[], chunkSize: number) =>
    Array.from({ length: arr.length / chunkSize }, () => arr.splice(0, chunkSize));
