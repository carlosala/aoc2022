import { partOne, partTwo, prepareInput } from ".";
import { iTest } from "./testInput";

const input = prepareInput(iTest);

describe("Day 03", () => {
  test("Part 1", () => {
    expect(partOne(input)).toBe(157);
  });
  test("Part 2", () => {
    expect(partTwo(input)).toBe(70);
  });
});
