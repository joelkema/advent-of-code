const input = ["Player 1 starting position: 8", "Player 2 starting position: 1"];

const positions: Record<number, number> = {
    1: 8,
    2: 1
}; 

const scores: Record<number, number> = {
    1: 0,
    2: 0,
};

const add = (accumulator: number, a: number) => accumulator + a;
const sum = (array: number[]) => array.reduce(add, 0);

// Because the  game board contains ten spaces (1 - 10), we are only interested in the last digit
// In case of 0, return 10
const getNextPosition = (pos: number, moveSpaces: number) => (pos + moveSpaces) % 10 > 0 ? (pos + moveSpaces) % 10 : 10;  

const losingScore = () => scores[1] > scores[2] ? scores[2] : scores[1]; 

export const assignment1 = () => { 
    let lastRoll = 0;
    let highestScore = 0;
    let dieRolled = 0; 

    while(highestScore < 1000) {
        for(let i=1;i<=2;i++) {
            const rolls = new Array(3);
            for (let i = 0; i < rolls.length; i++) {
                // This die always rolls 1 first, then 2, then 3, and so on up to 100, after which it starts over at 1 again. 
                lastRoll++;

                if(lastRoll > 100) lastRoll = 1;
            
                rolls[i] = lastRoll;             
            }

            const nextPosition = getNextPosition(positions[i], sum(rolls)); 

            positions[i] = nextPosition;
            scores[i] += nextPosition;
            dieRolled += rolls.length;

            if(scores[i] > highestScore) highestScore = scores[i];

            if(highestScore >= 1000) break; 
        }
    }

    return losingScore() * dieRolled;
}

