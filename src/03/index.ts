export type Input = string[];
interface HashMap {
  [k: string]: boolean;
}

export function prepareInput(i: string): Input {
  return i.trim().split("\n");
}

export function partOne(i: Input): number {
  let result = 0;
  i.forEach((elf) => {
    const data: HashMap = {};
    let repeated = "";
    for (const letter of elf.slice(0, elf.length / 2)) data[letter] = true;
    for (const letter of elf.slice(elf.length / 2)) {
      if (data[letter]) {
        repeated = letter;
        break;
      }
    }
    const offset = repeated === repeated.toUpperCase() ? 38 : 96; // using ascii tables from https://www.asciitable.com/
    result += repeated.charCodeAt(0) - offset;
  });
  return result;
}

export function partTwo(i: Input): number {
  let result = 0;
  for (let idx = 0; idx < i.length - 2; idx += 3) {
    const data0: HashMap = {};
    const data1: HashMap = {};
    let badge = "";
    for (const letter of i[idx]) data0[letter] = true;
    for (const letter of i[idx + 1]) data1[letter] = true;
    for (const letter of i[idx + 2]) {
      if (data0[letter] && data1[letter]) {
        badge = letter;
        break;
      }
    }
    const offset = badge === badge.toUpperCase() ? 38 : 96;
    result += badge.charCodeAt(0) - offset;
  }
  return result;
}
