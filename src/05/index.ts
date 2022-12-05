export interface Input {
  stacks: string[][];
  moves: number[][];
}

export function prepareInput(i: string): Input {
  const input: Input = { stacks: [], moves: [] };
  const split = i
    .trimEnd()
    .split("\n\n")
    .map((x) => x.split("\n"));
  const positions = split[0].reverse();
  for (let j = 1; j < positions.length; j++) {
    if (positions[j].trim() === "") continue;
    for (let k = 0; k < positions[j].length / 4; k++) {
      input.stacks[k] ??= [];
      const letter = positions[j][4 * k + 1];
      if (letter !== " ") input.stacks[k].push(letter);
    }
  }
  input.moves = split[1].map((x) => {
    const y = x.split(" ");
    return [parseInt(y[1]), parseInt(y[3]) - 1, parseInt(y[5]) - 1];
  });
  return input;
}

export function partOne(i: Input): string {
  const data = structuredClone(i);
  for (const move of data.moves) {
    for (let j = 0; j < move[0]; j++) {
      data.stacks[move[2]].push(data.stacks[move[1]].pop() ?? "");
    }
  }
  let msg = "";
  data.stacks.forEach((stack) => {
    msg += stack.pop() ?? "";
  });
  return msg;
}

export function partTwo(i: Input): string {
  const data = structuredClone(i);
  for (const move of data.moves) {
    data.stacks[move[2]].push(
      ...data.stacks[move[1]].splice(data.stacks[move[1]].length - move[0])
    );
  }
  let msg = "";
  data.stacks.forEach((stack) => {
    msg += stack.pop() ?? "";
  });
  return msg;
}
