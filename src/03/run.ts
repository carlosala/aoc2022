import { readFileSync } from "fs";
import { resolve } from "path";
import { partOne, partTwo, prepareInput } from ".";

const i = readFileSync(resolve(__dirname, "input.txt")).toString();

const input = prepareInput(i);
console.log("Part One:", partOne(input));
console.log("Part Two:", partTwo(input));
