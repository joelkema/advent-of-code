import { input } from "./input";

const assignment1 = (input.match(/\(/g) || []).length - (input.match(/\)/g) || []).length;


const Day = () => (
    <main>
        <h2>Day 1</h2>
        <p>Part one: {assignment1}</p>
        {/* <p>Part two: {fp2}</p> */}
    </main>
);

export default Day;
