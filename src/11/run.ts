import { readFileSync } from "fs";
import { resolve } from "path";
import { partOne, partTwo, prepareInput } from ".";

const i = readFileSync(resolve(__dirname, "input.txt")).toString();

const input1 = prepareInput(i);
const input2 = prepareInput(i);
console.log("Part One:", partOne(input1));
console.log("Part Two:", partTwo(input2));
