export type Input = string[];

export function prepareInput(i: string): Input {
  return i.trim().replace(/ /g, "").split("\n");
}

export function partOne(i: Input): number {
  const returnPoints: { [i: string]: number } = {
    AX: 4,
    BX: 1,
    CX: 7,
    AY: 8,
    BY: 5,
    CY: 2,
    AZ: 3,
    BZ: 9,
    CZ: 6,
  };
  let points = 0;
  i.forEach((round) => {
    points += returnPoints[round] ?? 0;
  });
  return points;
}

export function partTwo(i: Input): number {
  const returnPoints: { [i: string]: number } = {
    AX: 3,
    BX: 1,
    CX: 2,
    AY: 4,
    BY: 5,
    CY: 6,
    AZ: 8,
    BZ: 9,
    CZ: 7,
  };
  let points = 0;
  i.forEach((round) => {
    points += returnPoints[round] ?? 0;
  });
  return points;
}
