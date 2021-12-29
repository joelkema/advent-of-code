const input = ["00100","11110","10110","10111","10101","01111","00111","11100","10000","11001","00010","01010"]; 

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
 
export const assignment2 = () => {
    let oxygenGeneratorRating = ""; // most common
    let co2ScrubberRating = ""; // least common

    for(let index=0;index<input.length;index++){ 
        const filtered = input.filter(s => oxygenGeneratorRating ? s.startsWith(oxygenGeneratorRating) : true);

        if(filtered.length === 1) break;

        const sorted = sort(filtered.map((i) => Number(i.charAt(index))));
        oxygenGeneratorRating += sorted.pop();
    }

    for(let index=0;index<input.length;index++){ 
        const filtered = input.filter(s => co2ScrubberRating ? s.startsWith(co2ScrubberRating) : true);


        if(filtered.length === 1) break;

        const sorted = sort(filtered.map((i) => Number(i.charAt(index))));

        console.log(sorted)

        co2ScrubberRating += sorted.shift();

    }

    console.log(oxygenGeneratorRating);
    console.log(co2ScrubberRating);

    // for(let index=0;index<input.length;index++){ 
    //     input.filter(s => s.startsWith(oxygenGeneratorRating));

    //     const sorted = sort(input.map((i) => Number(i.charAt(index))));
    //     oxygenGeneratorRating += sorted.pop();
    // }


    // input[0].split("").forEach((_, index) => {
    //     const sorted = sort(input.map((i) => Number(i.charAt(index))));
    //     gamma += sorted.pop();
    //     epsilon += sorted.shift();
    // });

    // return parseInt(gamma, 2) * parseInt(epsilon, 2); 
};
