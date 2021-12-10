import input from "./input";

const sort = (arr: number[]) =>
    arr.sort((a, b) => arr.filter((v) => v === a).length - arr.filter((v) => v === b).length);

export const assignment1 = () => {
    let gamma = "";
    let epsilon = "";

    input[0].split("").forEach((_, index) => {
        const sorted = sort(input.map((i) => Number(i.charAt(index))));
        gamma += sorted.pop();
        epsilon += sorted.shift();
    });

    return parseInt(gamma, 2) * parseInt(epsilon, 2); 
};
