import { input } from "./input";

const dataStreamBuffer = input.split("");

const assignment = (countUnique = 4) => {
    let markerPos = 0;
    const characters: string[] = [];

    for (let i = 0; i < dataStreamBuffer.length; i++) {
        const unique = new Set(characters);
        markerPos = i;
        if (characters.length === countUnique && unique.size < countUnique) {
            characters.shift();
            characters.push(dataStreamBuffer[i]);
        } else if (characters.length < countUnique) {
            characters.push(dataStreamBuffer[i]);
        } else {
            break;
        }
    }

    return markerPos;
};

const Day = () => (
    <main>
        <h2>Day 6</h2>
        <p>Part one: {assignment(4)}</p>
        <p>Part two: {assignment(14)}</p>
    </main>
);

export default Day;
