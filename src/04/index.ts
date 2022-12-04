export type Input = number[][][];

export function prepareInput(i: string): Input {
  return i
    .trim()
    .split("\n")
    .map((x) => x.split(",").map((y) => y.split("-").map((z) => Number(z))));
}

export function partOne(i: Input): number {
  let result = 0;
  i.forEach((pair) => {
    if (
      (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) ||
      (pair[0][1] <= pair[1][1] && pair[0][0] >= pair[1][0])
    )
      result++;
  });
  return result;
}

export function partTwo(i: Input): number {
  let result = 0;
  i.forEach((pair) => {
    if (
      (pair[0][0] <= pair[1][1] && pair[0][1] >= pair[1][0]) ||
      (pair[1][0] <= pair[0][1] && pair[1][1] >= pair[0][0])
    ) {
      result++;
    }
  });
  return result;
}
