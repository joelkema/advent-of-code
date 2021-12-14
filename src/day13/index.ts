import { dots } from "./input";

const empty = "•";
const dot = "#";

const sort = (array: number[]) => array.sort((a, b) => b -a);

const getMaxY = (array: number[][]) => sort(array.map(arr => arr[0]))[0];
const getMaxX = (array: number[][]) => sort(array.map(arr => arr[1]))[0]; 



const generatePaper = () => {
    const maxX = getMaxX(dots);
    const maxY = getMaxY(dots);

    const grid = [...Array(maxX)].map(_ => Array(maxY).fill(empty)); 

    for(let i =0;i<dots.length;i++) {
        const [x, y] = dots[i];
        grid[x][y] = dot;
    }

    return grid;
}

export const assignment1 = () => {
    const paper = generatePaper();



    console.log(paper)
}