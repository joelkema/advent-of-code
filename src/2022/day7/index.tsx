import { getNewLines } from "../../utils/string";
import { input } from "./input";

type File = {
    name: string;
    size: number;
};

type Directory = {
    name: string;
    dirs: Directory[];
    files: File[];
};

const createDir = (name: string, dirs: Directory[] = [], files: File[] = []) => ({
    name,
    dirs,
    files,
});
const createFile = (name: string, size: number): File => ({
    name,
    size,
});

const terminalOutput = [...getNewLines(input)];
const fileSystem: Directory = createDir("/");

const findDir = (currentDir: Directory, cmd: string) => {
    console.log("trying to find " + cmd);
    console.log(currentDir);

    return currentDir.dirs.find((a) => a.name === cmd)!;
};

const createOrGetDir = (currentDir: Directory, name: string) => {
    const existingDir = currentDir.dirs.find((a) => a.name === name);
    if (existingDir) return existingDir;

    const newDir = createDir(name);
    currentDir.dirs.push(newDir);

    return newDir;
};

const changeDir = (currentDir: Directory, cmd: string): Directory => {

    if (cmd === "/") return currentDir;
    if (cmd === "..") {
        return fileSystem;
    }

    // go to child dir
    return findDir(currentDir, cmd);
};

const assignment1 = () => {
    let cursor: string[] = [];
    let currentDir: Directory = fileSystem;

    console.log(currentDir)


    for (let i = 0; i < terminalOutput.length; i++) {
        const pieces = terminalOutput[i].split(" ");

        if (pieces[0] === "$" && pieces[1] === "cd") {
            currentDir = changeDir(currentDir, pieces[2]);
        } else if (pieces[0] === "$" && pieces[1] === "ls") continue;
        else if (pieces[0] === "dir") {
            createOrGetDir(currentDir, pieces[1]); 
        } else {

            if(currentDir)
                currentDir.files.push(createFile(pieces[1], parseInt(pieces[0])));
        }
    }

    return 1;
};

const generateView = (dir: Directory) => {
    return (
        <ul>
            <li>{dir.name} (dir)</li>
            {dir.dirs.map(generateView)}
            {dir.files.map(({ name, size }) => (
                <li>
                    {name} (file, size={size})
                </li>
            ))}
        </ul>
    );
};

const Day = () => (
    <main>
        <h2>Day 7</h2>
        {generateView(fileSystem)}

        <p>Part one: {assignment1()}</p>
    </main>
);

export default Day;
