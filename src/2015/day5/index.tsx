import { pipe } from "effect";
import * as A from "fp-ts/Array";
import * as O from "fp-ts/Option";
import { not } from "../../shared/logic";
import { removeWhitespaces } from "../../utils";
import { split } from "../../utils/string";
import { input } from "./input";

const getLines = (i: string) => pipe(i, split(/\n/), A.map(removeWhitespaces), A.filter(not((s) => s === "")));

const hasThreeVowels = (input: string): boolean => (input.match(/[aeiou]/g) || []).length >= 3;
const hasDoubleLetter = (input: string): boolean => /(.)(\1)/.test(input);
const hasForbiddenSubstrings = (input: string): boolean => /ab|cd|pq|xy/.test(input);

const hasPairTwice = (input: string): boolean => /(..).*\1/.test(input);
const hasRepeatingLetter = (input: string): boolean => /(.).\1/.test(input);

const isNice = (input: string): boolean =>
    pipe(
        O.of(input),
        O.filter((str) => hasThreeVowels(str)),
        O.filter(hasDoubleLetter),
        O.filter(not(hasForbiddenSubstrings)),
        O.isSome,
    );

const isNice2 = (input: string): boolean =>
    pipe(O.of(input), O.filter(hasPairTwice), O.filter(hasRepeatingLetter), O.isSome);

const assignment1 = () => pipe(getLines(input), A.filter(isNice), A.size);
const assignment2 = () => pipe(getLines(input), A.filter(isNice2), A.size);

const Day = () => {
    return (
        <main>
            <p>Part 1: {assignment1()}</p>
            <p>Part 2: {assignment2()}</p>
        </main>
    );
};

export default Day;
