import { pipe } from "fp-ts/lib/function";
import { split } from "../../utils/string";
import { input } from "./input";

import * as A from "fp-ts/Array";
import { removeWhitespaces, sumProduct } from "../../utils";
import { get } from "lodash";

const getLines = (i: string) => pipe(i, split(/\n/));

const cardStrength = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    // rest is number
};

type Hand = {
    cards: string[];
    occurences: {
        [key: string]: number;
    };
    strength: number;
};

const countUniqueChars = (s: string): Record<string, number> =>
    s.split("").reduce((prev, curr) => {
        prev[curr] = (prev[curr] || 0) + 1;
        return prev;
    }, {} as Record<string, number>);

const getHand = (cards: string): Hand => {
    const cardValues = cards.split("");
    const occurences = countUniqueChars(cards);
    const values = Object.values(occurences);

    const hasFiveOfAKind = values.some((o) => o === 5);
    const hasFourOfAKind = values.some((o) => o === 4);
    const hasThreeOfAKind = values.some((o) => o === 3);
    const hasTwoPair = values.filter((o) => o === 2).length === 2;
    const hasOnePair = values.some((o) => o === 2);
    const hasFullHouse = hasThreeOfAKind && hasOnePair;

    const strength = hasFiveOfAKind
        ? 6
        : hasFourOfAKind
        ? 5
        : hasFullHouse
        ? 4
        : hasThreeOfAKind
        ? 3
        : hasTwoPair
        ? 2
        : hasOnePair
        ? 1
        : 0;

    return {
        cards: cardValues,
        occurences,
        strength,
    };
};

const assignment1 = () => {
    const lines = getLines(input);

    const rounds = lines.map((s) => s.split(" "));

    const hands = rounds
        .map((round) => {
            const cards = round[0];
            const bid = Number(round[1]);

            const hand = getHand(cards);

            return hand;
        })
        .sort((a, b) => a.strength - b.strength)
        .sort((a, b) => {
            // sort by first highest letter of cards
            // that can be the first, second or third
            if (a.strength === b.strength) {
                // const compareChars = (index: number) => {
                //     const aChar = a.cards[index];
                //     const bChar = b.cards[index];

                //     if (aChar === bChar) {
                //         return compareChars(index + 1);
                //     }

                //     return aChar.charCodeAt(0) - bChar.charCodeAt(0);
                // };

                debugger;

                return a.cards[0].charCodeAt(0) - b.cards[0].charCodeAt(0);
            }
            return 0;
        });

    debugger;
};
const assignment2 = () => {};

const Day = () => (
    <main>
        <h2>Day 7</h2>
        <p>Part one: {assignment1()}</p>
        <p>Part two: {assignment2()}</p>
    </main>
);

export default Day;
