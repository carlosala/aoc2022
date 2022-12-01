export type Input = number[][];

export function prepareInput(i: string): Input {
  return i
    .trim()
    .split("\n\n")
    .map((x) => x.split("\n").map((v) => Number(v)));
}

export function partOne(i: Input): number {
  let maxCalories = 0;
  i.forEach((elf) => {
    let calories = 0;
    elf.forEach((supply) => {
      calories += supply;
    });
    if (maxCalories < calories) maxCalories = calories;
  });
  return maxCalories;
}

export function partTwo(i: Input): number {
  const maxCalories: number[] = [0, 0, 0];
  i.forEach((elf) => {
    let calories = 0;
    elf.forEach((supply) => {
      calories += supply;
    });
    if (calories > maxCalories[0]) {
      maxCalories[0] = calories;
      maxCalories.sort((a, b) => a - b);
    }
  });
  return maxCalories.reduce((prev, cur) => prev + cur, 0);
}
