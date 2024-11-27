import { pipe } from "fp-ts/lib/function";
import { not } from "../../shared/logic";
import { split } from "../../utils/string";
import { input } from "./input";
import * as A from "fp-ts/Array";

const getLines = (i: string) => pipe(i, split(/\n/), A.filter(not((s) => s === "")));

type Operator = "AND" | "OR" | "NOT" | "LSHIFT" | "RSHIFT" | "PASS";

interface Operation {
    inputs: string[]; // Wire names or constants
    operator: Operator;
    output: string; // Wire name
}

type Resolved = Record<string, number>; // Stores resolved wire values

// x AND y -> d
const operators: Record<Operator, (...args: number[]) => number> = {
    AND: (a, b) => a & b,
    OR: (a, b) => a | b,
    NOT: (a) => ~a & 0xffff, // Bitwise NOT with 16-bit mask
    LSHIFT: (a, b) => a << b,
    RSHIFT: (a, b) => a >> b,
    PASS: (a) => a,
};

const parseOperation = (input: string): Operation => {
    const [left, output] = input.split(" -> ");
    const parts = left.split(" ");

    if (parts.length === 1) {
        // Constant assignment (e.g., "123 -> x")
        return { inputs: [parts[0]], operator: "PASS", output };
    } else if (parts.length === 2) {
        // Unary operation (e.g., "NOT x -> y")
        return { inputs: [parts[1]], operator: parts[0] as Operator, output };
    } else if (parts.length === 3) {
        // Binary operation (e.g., "x AND y -> z")
        return { inputs: [parts[0], parts[2]], operator: parts[1] as Operator, output };
    }

    throw new Error(`Invalid operation format: ${input}`);
};

const evaluateCircuit = (operationStrings: string[], override?: Record<string, string>) => {
    const operations = operationStrings.map(parseOperation);

    // cache values
    const resolved: Resolved = {};

    const resolve = (name: string): number => {
        // If there's an override, resolve the wire based on the override wire
        if (override && override[name]) {
            return resolve(override[name]);
        }

        // If it's a constant, return the number
        if (!isNaN(Number(name))) return Number(name);

        // Use cached value if available
        if (resolved[name] !== undefined) return resolved[name];

        // Find the operation that produces this wire
        const operation = operations.find((op) => op.output === name);
        if (!operation) throw new Error(`Wire ${name} is undefined`);

        console.log(`Evaluating operation: ${operation.inputs.join(" ")} ${operation.operator} -> ${operation.output}`);

        // Resolve inputs recursively
        const inputs = operation.inputs.map(resolve);

        // Compute the value using the operator
        const value = operators[operation.operator](...inputs);

        // Print the flow of this wire resolution
        console.log(`Resolved ${name} with inputs ${inputs.join(", ")} -> ${value}`);

        // Cache and return the computed value
        resolved[name] = value;
        return value;
    };

    return { resolve };
};

const assignment1 = () => {
    const operations = getLines(input);

    const circuit = evaluateCircuit(operations);

    return circuit.resolve("a");
};

const assignment2 = () => {
    const operations = getLines(input);

    // we want to override the value of a with the value of b
    const circuit = evaluateCircuit(operations, { a: "b" });

    return circuit.resolve("a");
};

const Day = () => {
    return (
        <main>
            <p>Part 1: {assignment1()}</p>
            <p>Part 2: {assignment2()}</p>
        </main>
    );
};

export default Day;
