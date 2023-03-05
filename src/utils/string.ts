import { removeWhitespaces } from ".";

export const alphabet = "abcdefghijklmnopqrstuvwxyz";

export const replaceAll = (searchValue: string | RegExp, replaceValue: string) => (str: string) =>
    str.replaceAll(searchValue, replaceValue);

export const getNewLines = (str: string) => str.split(/\n/).filter(removeWhitespaces);

export const split =
    (splitter: { [Symbol.split](string: string, limit?: number | undefined): string[] }, limit?: number) =>
    (string: string) =>
        string.split(splitter, limit);
