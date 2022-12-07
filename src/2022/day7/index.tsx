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

const fileSystem: Directory = createDir("/", [createDir("a", [createDir("e")], [{ name: "1.txt", size: 999 }])]);

const assignment1 = () => {
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
