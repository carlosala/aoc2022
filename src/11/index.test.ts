import { readFileSync } from "fs";
import { resolve } from "path";
import { partOne, partTwo, prepareInput } from ".";

const iTest = readFileSync(resolve(__dirname, "input.test.txt")).toString();

const input1 = prepareInput(iTest);
const input2 = prepareInput(iTest);

test("Part 1", () => {
  expect(partOne(input1)).toBe(10605);
});
test("Part 2", () => {
  expect(partTwo(input2)).toBe(2713310158);
});
