import { input1, input3 } from "./input";

type Node = {
    name: string;
    neighbors: string[];
}

const isStart = (str: string) => str.toLowerCase() === "start";
const isEnd = (str: string) => str.toLowerCase() === "end";


const isSmallCave = (str: string) => str.toLowerCase() === str;
const isBigCave = (str: string) => str.toUpperCase() === str;

const countInArray = (array: string[], what: string) => array.filter(item => item == what).length;

const generateNodes = (treeInput: string[]) => {
    const allPaths = treeInput.map(x => x.split("-"));

    const uniqueNodes = new Set(allPaths.reduce((prev: string[], curr) => [...prev].concat(curr), [])); 

    const nodes: Record<string, Node> = Array.from(uniqueNodes).reduce((map: Record<string, Node>, name: string) => {
        const neighbors = allPaths.filter(x => x[0] === name).map(x => x[1]);

        map[name] = { name, neighbors: [...neighbors] };  

        return map; 
    }, {});
    
    Object.values(nodes).forEach(({ name, neighbors }) => {
        neighbors.forEach(neighbor => { 
            if(!nodes[neighbor].neighbors.includes(name))
                nodes[neighbor].neighbors.push(name);
        }) 
    })
    
    return nodes;
}

let count = 0;

const traverse = (nodes: Record<string, Node>, { name, neighbors }: Node, path: string[]) => {
    path.push(name);

    if(name === "end"){
        console.log("Found Valid", path); 
        count++;
        return path;
    }

    for(let i=0;i<neighbors.length;i++) {
        const n = neighbors[i];

        if((!isStart(n) && countInArray(path, n) < 1) || isBigCave(n)){   
            traverse(nodes, nodes[n], [...path]);
        }
    }
}
 
export const assignment1 = () => {
    const nodes = generateNodes(input1);
     
    const validPaths: string[] = [];

    traverse(nodes, nodes["start"], validPaths); 
    console.log(count)
}

