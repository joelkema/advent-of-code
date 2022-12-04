import { removeWhitespaces, sum } from "../../utils";
import { alphabet } from "../../utils/string";
import { input } from "./input";

const lines = input.split(/\n/).filter(removeWhitespaces);

const priority = `${alphabet}${alphabet.toUpperCase()}`.split("");

const getRucksacks = (content: string) => {
    const middle = Math.floor(content.length / 2);
    const first = content.substring(0, middle);
    const second = content.substring(middle, content.length);

    return [first, second];
};

console.log(priority);

// coverting to set results in unique chars
const getSameChars = ([s1, s2]: string[]) => Array.from(new Set(s1.split(""))).filter((s) => s2.includes(s));

export const assignment1 = () =>
    sum(
        lines.map((line) => {
            const [char] = getSameChars(getRucksacks(line));

            return priority.indexOf(char) + 1;
            // debugger;
        }),
    );

// export const assignment2 = () => getTotalScore(getOutcomeBasedShape);

const Day = () => (
    <main>
        <h2>Day 3</h2>
        <p>Part one: {assignment1()}</p>
        {/* <p>Part two: {assignment2()}</p> */}
    </main>
);

export default Day;
