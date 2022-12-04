import { removeWhitespaces } from "../../utils";
import { input } from "./input";

const first = <T,>(arr: T[]) => arr[0];
const last = <T,>(arr: T[]) => arr[arr.length - 1];

const allSections = Array.from(Array(100).keys()).splice(1);

const allLines = input.split(/\n/).filter(removeWhitespaces);

const getAssignedSections = (str: string) => {
    const section = str.split("-");
    const firstNr = parseInt(first(section));
    const secondNr = parseInt(section[1]);

    return [...allSections].splice(firstNr - 1, secondNr - firstNr + 1);
};

const isBetween = (arr1: number[], arr2: number[]) => first(arr1) <= first(arr2) && last(arr1) >= last(arr2);

const filterLines = (filterFn: (first: number[], second: number[]) => boolean) => (lines: string[]) =>
    lines.filter((line) => {
        const [firstElf, secondElf] = line.split(",");

        const firstSections = getAssignedSections(firstElf);

        const secondSections = getAssignedSections(secondElf);

        return filterFn(firstSections, secondSections);
    }).length;

const assignment1 = () =>
    filterLines(
        (firstSections, secondSections) =>
            isBetween(firstSections, secondSections) || isBetween(secondSections, firstSections),
    )(allLines);

const assignment2 = () =>
    filterLines((firstSections, secondSections) => firstSections.some((n) => secondSections.includes(n)))(allLines);

const Day = () => (
    <main>
        <h2>Day 4</h2>
        <p>Part one: {assignment1()}</p>
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
