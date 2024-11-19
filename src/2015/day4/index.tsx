import MD5 from "crypto-js/md5";

const findHex = (input: string, prefix: string) => {
    let i = 0;
    let hash = "";
    while (true) {
        hash = MD5(input + i).toString();
        if (hash.startsWith(prefix)) {
            break;
        }
        i++;
    }

    return i;
};

const assignment1 = () => findHex("iwrupvqb", "00000");

// we are brute forcing this one
// this takes too long to run ...
const assignment2 = () => findHex("iwrupvqb", "000000");

const Day = () => {
    return (
        <main>
            <p>Part 1: {assignment1()}</p>
            <p>Part 2: {assignment2()}</p>
        </main>
    );
};

export default Day;
