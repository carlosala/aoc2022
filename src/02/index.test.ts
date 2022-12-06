import { partOne, partTwo, prepareInput } from ".";
import { iTest } from "./testInput";

const input = prepareInput(iTest);

test("Part 1", () => {
  expect(partOne(input)).toBe(15);
});
test("Part 2", () => {
  expect(partTwo(input)).toBe(12);
});
