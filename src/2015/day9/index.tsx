import { pipe } from "effect";
import { not } from "../../shared/logic";
import { split } from "../../utils/string";
import * as A from "effect/Array";

const input = `
London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141
`;

type ToNode = Record<string, number>;

type Nodes = Record<string, ToNode>;

const getLines = (i: string) => pipe(i, split(/\n/), A.filter(not((s) => s === "")));

const assignment1 = () => {
    const routes = getLines(input);

    const map = routes.reduce((acc, route) => {
        // Step 1: Split the route into parts
        const [routePart, distance] = route.split(" = ");
        const [from, to] = routePart.split(" to ");
        const distanceNumber = parseInt(distance, 10);

        // Step 2: Add to the nested map
        if (!acc.has(from)) {
            acc.set(from, new Map());
        }
        acc.get(from)!.set(to, distanceNumber);

        return acc;
    }, new Map<string, Map<string, number>>());

    debugger;
};

const Day = () => {
    return (
        <main>
            <p>Part 1: {assignment1()}</p>
        </main>
    );
};

export default Day;
