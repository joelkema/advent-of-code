const input = `
""
"abc"
"zf\x23\\hlj\\kkce\\d\\asy\"yyfestwcdxyfj"
`;

const totalNumberOfCharacters = (input: string) => input.length;

const totalNumberOfCharactersInMemory = (input: string) => {
    return JSON.parse(input).length;
};

const assignment1 = () => {
    const a = '"aaa"aaa"';

    console.log(totalNumberOfCharacters(a));
    console.log(totalNumberOfCharactersInMemory(a));

    return 0;
};

const Day = () => {
    return (
        <main>
            <p>Part 1: {assignment1()}</p>
        </main>
    );
};

export default Day;
