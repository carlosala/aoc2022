export type Input = Action[];

interface Action {
  num: number;
  axis: Axis;
}

const enum Axis {
  X,
  Y,
}

export function prepareInput(i: string): Input {
  const input: Input = [];
  i.trim()
    .split("\n")
    .forEach((line) => {
      const [dir, strNum] = line.split(" ");
      const num = ["D", "L"].includes(dir) ? parseInt("-" + strNum) : parseInt(strNum);
      const axis = ["L", "R"].includes(dir) ? Axis.X : Axis.Y;
      input.push({ num, axis });
    });
  return input;
}

function vecInList(list: number[][], vec: number[]): boolean {
  for (const el of list) if (el[0] === vec[0] && el[1] === vec[1]) return true;
  return false;
}

function touching(vec1: number[], vec2: number[]): boolean {
  return Math.abs(vec1[0] - vec2[0]) <= 1 && Math.abs(vec1[1] - vec2[1]) <= 1;
}

export function partOne(i: Input): number {
  const visitedPoints = [[0, 0]];
  const head = [0, 0];
  const tail = [0, 0];
  for (const move of i) {
    if (move.axis === Axis.X) head[0] += move.num;
    else head[1] += move.num;
    while (!touching(head, tail)) {
      tail[0] += Math.sign(head[0] - tail[0]);
      tail[1] += Math.sign(head[1] - tail[1]);
      if (!vecInList(visitedPoints, tail)) visitedPoints.push([...tail]);
    }
  }
  return visitedPoints.length;
}

export function partTwo(i: Input): number {
  const visitedPoints = [[0, 0]];
  const rope: number[][] = [];
  for (let j = 0; j < 10; j++) rope.push([0, 0]);
  for (const move of i) {
    if (move.axis === Axis.X) rope[0][0] += move.num;
    else rope[0][1] += move.num;
    while (!touching(rope[0], rope[1])) {
      for (let j = 1; j < 10; j++) {
        if (!touching(rope[j - 1], rope[j])) {
          rope[j][0] += Math.sign(rope[j - 1][0] - rope[j][0]);
          rope[j][1] += Math.sign(rope[j - 1][1] - rope[j][1]);
          if (j === 9 && !vecInList(visitedPoints, rope[j])) visitedPoints.push([...rope[j]]);
        }
      }
    }
  }
  return visitedPoints.length;
}
