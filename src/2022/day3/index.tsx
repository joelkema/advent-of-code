import { removeWhitespaces, sum } from "../../utils";
import { chunk } from "../../utils/array";
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

// coverting to set results in unique chars
const getSameChar = (lines: string[]) => {
    const chars = Array.from(new Set(lines[0].split("")));
    const flat = lines.slice(1, lines.length - 1);

    return chars.find((s) => flat.in);
};
// .find((s) => s2.includes(s) && (!s3 || s3.includes(s)))!;

const mapLineToPriority = (line: string) => {
    console.log(getSameChar(getRucksacks(line)));
    return priority.indexOf(getSameChar(getRucksacks(line))) + 1;
};

const mapLinesToPriority = (l: string[]) => sum(l.map(mapLineToPriority));

const assignment1 = () => {
    const a = mapLinesToPriority(lines);

    console.log(a);
};

const assignment2 = () => {
    const groups = chunk(lines, 3);

    // console.log(groups.map(mapLinesToPriority));

    // debugger;
};
// export const assignment2 = () => getTotalScore(getOutcomeBasedShape);

const Day = () => (
    <main>
        <h2>Day 3</h2>
        <p>Part one: {assignment1()}</p>
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
