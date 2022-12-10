export type Input = number[];

export function prepareInput(i: string): Input {
  return i
    .trim()
    .split("\n")
    .map((l) => (l.startsWith("noop") ? 0 : parseInt(l.split(" ")[1])));
}

export function partOne(i: Input): number {
  const targetCycles = [20, 60, 100, 140, 180, 220];
  let result = 0;
  let x = 1;
  let cycle = 0;
  for (const ins of i) {
    cycle++;
    if (targetCycles.includes(cycle)) result += cycle * x;
    if (ins !== 0) {
      cycle++;
      if (targetCycles.includes(cycle)) result += cycle * x;
      x += ins;
    }
    if (cycle >= 220) break;
  }
  return result;
}

export function partTwo(i: Input): void {
  const targetCycles = [40, 80, 120, 160, 200, 240];
  let result = "";
  let x = 1;
  let cycle = 0;
  for (const ins of i) {
    result += Math.abs((cycle % 40) - x) <= 1 ? "█" : " ";
    cycle++;
    if (targetCycles.includes(cycle)) result += "\n";
    if (ins !== 0) {
      result += Math.abs((cycle % 40) - x) <= 1 ? "█" : " ";
      cycle++;
      if (targetCycles.includes(cycle)) result += "\n";
      x += ins;
    }
    if (cycle >= 240) break;
  }
  console.log(result);
}
