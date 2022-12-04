import { removeWhitespaces, sum } from "../../utils";
import { chunk } from "../../utils/array";
import { alphabet } from "../../utils/string";
import { input } from "./input";

const allLines = input.split(/\n/).filter(removeWhitespaces).map(removeWhitespaces);

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
    const flat = lines.slice(1);

    const a = chars.find((s) => flat.every((f) => f.includes(s)))!;

    return a;
};

const mapLineToPriority = (line: string) => priority.indexOf(getSameChar(getRucksacks(line))) + 1;
const mapLinesToPriority = (l: string[]) => l.map(mapLineToPriority);

const assignment1 = () => sum(mapLinesToPriority(allLines));

const assignment2 = () => sum(chunk([...allLines], 3).map((group) => priority.indexOf(getSameChar(group)) + 1));

const Day = () => (
    <main>
        <h2>Day 3</h2>
        <p>Part one: {assignment1()}</p>
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
