import { readFileSync } from "fs";
import { resolve } from "path";
import { partOne, prepareInput } from ".";

const iTest = readFileSync(resolve(__dirname, "input.test.txt")).toString();

const input = prepareInput(iTest);

test("Part 1", () => {
  expect(partOne(input)).toBe(13140);
});
