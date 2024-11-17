import { input } from "./input";

const assignment1 = (input.match(/\(/g) || []).length - (input.match(/\)/g) || []).length;

const assignment2 = () => {
    let floor = 1;
    for (let i = 0; i < input.length; i++) {
        floor += input[i] === "(" ? 1 : -1;
        if (floor === -1) {
            return i;
        }
    }
    return -1;
};

const Day = () => (
    <main>
        <h2>Day 1</h2>
        <p>Part one: {assignment1}</p>
        <p>Part two: {assignment2()}</p>
        {/* <p>Part two: {fp2}</p> */}
        {/* <p>Part two: {fp2}</p> */}
    </main>
);

export default Day;
