const input = "1113222113";

const splitByCharacter = (input: string): string[] => input.match(/(.)\1*/g) || [];

const lookAndSay = (input: string): string =>
    splitByCharacter(input)
        .map((x) => `${x.length}${x[0]}`)
        .join("");

const assignment1 = () => {
    const runAmountOfTimes = 50;
    let currentInput = input;

    for (let i = 0; i < runAmountOfTimes; i++) {
        currentInput = lookAndSay(currentInput);
    }

    return currentInput.length;
};

const Day = () => {
    return (
        <main>
            <p>Part 1: {assignment1()}</p>
        </main>
    );
};

export default Day;
