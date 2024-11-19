const line = `
123 -> x
456 -> y
x AND y -> d
`;

// x AND y -> d
type AndGate = {
    x: string;
    y: string;
    target: string;
};

const lineToOperation = (line: string) => {
    const [operation, target] = line.split(" -> ");
    return { operation, target };
};

const assignment1 = () => {
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
