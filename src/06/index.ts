export type Input = string;

export function prepareInput(i: string): Input {
  return i.trim();
}

export function partOne(i: Input): number {
  let stack = "";
  let j = 0;
  while (stack.length !== 4) {
    const offset = 4 - stack.length;
    const newLetters = i.slice(j, j + offset);
    for (let k = 0; k < offset; k++) {
      if (stack.includes(newLetters[k])) stack = stack.slice(stack.indexOf(newLetters[k]) + 1);
      stack += newLetters[k];
      j++;
    }
  }
  return j;
}

export function partTwo(i: Input): number {
  let stack = "";
  let j = 0;
  while (stack.length !== 14) {
    const offset = 14 - stack.length;
    const newLetters = i.slice(j, j + offset);
    for (let k = 0; k < offset; k++) {
      if (stack.includes(newLetters[k])) stack = stack.slice(stack.indexOf(newLetters[k]) + 1);
      stack += newLetters[k];
      j++;
    }
  }
  return j;
}
