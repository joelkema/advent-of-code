import { input2, input3 } from "./input";

type Node = {
    name: string;
    neighbors: string[];
}

const isSmallCave = (str: string) => str.toLowerCase() === str;
const isBigCave = (str: string) => str.toUpperCase() === str;

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

    neighbors.forEach(n => {
        if(!path.includes(n) || isBigCave(n)){ 
            traverse(nodes, nodes[n], [...path]);
        }
    });
}


const getDistinctPaths = (nodes: Record<string, Node>) => {
    const validPaths: string[] = [];

    traverse(nodes, nodes["start"], validPaths); 

    console.log(validPaths);
}

export const assignment1 = () => {
    const nodes = generateNodes(input3);
     
    getDistinctPaths(nodes);

    console.log(count);
}

