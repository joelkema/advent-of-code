import { cloneDeep } from "lodash";
import { transpose } from "../../utils/array";
import { getNewLines, replaceAll } from "../../utils/string";
import { input } from "./input";

const dataStreamBuffer = input.split("");

const assignment1 = () => {
    let markerPos = 0;
    const characters: string[] = [];

    for (let i = 0; i < dataStreamBuffer.length; i++) {
        const unique = new Set(characters);
        markerPos = i;
        if (characters.length === 4 && unique.size < 4) {
            characters.shift();
            characters.push(dataStreamBuffer[i]);
        } else if (characters.length < 4) {
            characters.push(dataStreamBuffer[i]);
        } else {
            break;
        }
    }

    debugger;

    return 1;
};

const Day = () => (
    <main>
        <h2>Day 6</h2>
        <p>Part one: {assignment1()}</p>
        {/* <p>Part two: {assignment(false)}</p> */}
    </main>
);

export default Day;
