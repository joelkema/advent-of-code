import { pipe } from "effect";
import { split } from "../../utils/string";
import { input } from "./input";

import * as A from "effect/Array";
import { removeWhitespaces, sum, sumProduct } from "../../utils";
import { get } from "lodash";

type Hand = {
    cards: string[];
    occurences: {
        [key: string]: number;
    };
    // hand strength by a table
    // 0: high card
    // 1: one pair
    // 2: two pair
    // 3: three of a kind
    // 4: full house
    // 5: four of a kind
    // 6: five of a kind
    strength: number;
    // the total value of the hand, example, two aces is 14 + 14 = 28
    totalValue: number;
};

const getLines = (i: string) => pipe(i, split(/\n/));

const cardStrengthDay1 = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    // rest is number
};

const getStrength =
    (strengthMapping = cardStrengthDay1) =>
    (card: string) =>
        strengthMapping[card as keyof typeof strengthMapping] || Number(card[0]);

const countUniqueChars = (s: string): Record<string, number> =>
    s.split("").reduce((prev, curr) => {
        prev[curr] = (prev[curr] || 0) + 1;
        return prev;
    }, {} as Record<string, number>);

const getHand = (cards: string, strengthMapping = cardStrengthDay1): Hand => {
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
        totalValue: sum(cardValues.map(getStrength(strengthMapping))),
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

            return { hand, bid };
        })
        // first by hand strength
        .sort((a, b) => a.hand.strength - b.hand.strength)
        // then by total value (if strength is the same)
        // .sort((a, b) => a.hand.totalValue - b.hand.totalValue)
        // then by highest card
        .sort((a, b) => {
            // sort by first highest letter of cards
            // that can be the first, second or third
            if (a.hand.strength === b.hand.strength) {
                const highest = a.hand.cards.map((card, index) => {
                    const calculateStrength = getStrength(cardStrengthDay1);
                    const strength = calculateStrength(card);
                    const bStrength = calculateStrength(b.hand.cards[index]);

                    if (strength - bStrength !== 0) return strength - bStrength;

                    return 0;
                });

                return highest.find((b) => b !== 0) || 0;
            }
            return 0;
        });

    // sum bids
    return sum(hands.map(({ hand, bid }, index) => (index + 1) * bid));
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
