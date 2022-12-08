export type Input = string[];

interface FS {
  size: number;
  [d: string]: FS | number;
}

export function prepareInput(i: string): Input {
  return i.trim().split("\n");
}

function getDirFromNames(fs: FS, names: string[]): FS {
  let currDir: FS = fs;
  // @ts-expect-error
  for (const name of names) currDir = currDir[name];
  return currDir;
}

function sumSize(fs: FS, names: string[], filename: string, size: number): void {
  fs.size += size;
  let currDir: FS = fs;
  for (const name of names) {
    // @ts-expect-error
    currDir = currDir[name];
    currDir.size += size;
  }
  currDir[filename] = size;
}

function parseInput(i: Input): FS {
  const fs: FS = { size: 0 };
  const currDir: string[] = [];
  let j = 0;
  while (j < i.length) {
    if (i[j].startsWith("$ cd")) {
      const dir = i[j].slice(5);
      if (dir.startsWith("..")) currDir.pop();
      else if (dir.startsWith("/")) currDir.length = 0;
      else {
        getDirFromNames(fs, currDir)[dir] ??= { size: 0 };
        currDir.push(dir);
      }
      j++;
    } else {
      j++;
      while (j < i.length && !i[j].startsWith("$")) {
        if (i[j].startsWith("dir")) {
          j++;
          continue;
        }
        const [size, name] = i[j].split(" ");
        if (getDirFromNames(fs, currDir)[name] === undefined)
          sumSize(fs, currDir, name, Number(size));
        j++;
      }
    }
  }
  return fs;
}

function sumPart1(fs: FS): number {
  let sum = 0;
  // @ts-expect-error
  for (const key in fs) if (typeof fs[key] !== "number") sum += sumPart1(fs[key]);
  if (fs.size <= 100000) sum += fs.size;
  return sum;
}

function getAllSizes(fs: FS): number[] {
  const sizes = [fs.size];
  // @ts-expect-error
  for (const key in fs) if (typeof fs[key] !== "number") sizes.push(...getAllSizes(fs[key]));
  return sizes;
}

export function partOne(i: Input): number {
  const fs = parseInput(i);
  return sumPart1(fs);
}

export function partTwo(i: Input): number {
  const fs = parseInput(i);
  const targetSize = 30000000 - (70000000 - fs.size);
  let result = Infinity;
  for (const size of getAllSizes(fs)) if (size < result && size > targetSize) result = size;
  return result;
}
