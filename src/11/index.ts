export type Input = Monkey[];

class Monkey {
  worry: number[];
  op: string;
  val: number | string;
  test: number;
  toTrue: number;
  toFalse: number;
  operationPart1(): number {
    if (typeof this.val === "string") {
      if (this.op === "+") this.worry[0] = Math.floor((this.worry[0] + this.worry[0]) / 3);
      else this.worry[0] = Math.floor((this.worry[0] * this.worry[0]) / 3);
    } else {
      if (this.op === "+") this.worry[0] = Math.floor((this.worry[0] + this.val) / 3);
      else this.worry[0] = Math.floor((this.worry[0] * this.val) / 3);
    }
    return this.worry[0];
  }

  operationPart2(): number {
    if (typeof this.val === "string") {
      if (this.op === "+") this.worry[0] = this.worry[0] + this.worry[0];
      else this.worry[0] = this.worry[0] * this.worry[0];
    } else {
      if (this.op === "+") this.worry[0] = this.worry[0] + this.val;
      else this.worry[0] = this.worry[0] * this.val;
    }
    return this.worry[0];
  }

  testAndSend(): number {
    const to = this.worry[0] % this.test === 0 ? this.toTrue : this.toFalse;
    this.worry.splice(0, 1);
    return to;
  }

  constructor(
    worry: number[],
    op: string,
    val: number | string,
    test: number,
    toTrue: number,
    toFalse: number
  ) {
    this.worry = [...worry];
    this.op = op;
    this.val = val;
    this.test = test;
    this.toTrue = toTrue;
    this.toFalse = toFalse;
  }
}

export function prepareInput(i: string): Input {
  const input: Input = [];
  const split = i.trim().split("\n");
  for (let j = 1; j < split.length - 4; j += 7) {
    const worry = split[j]
      .trim()
      .split(" ")
      .slice(2)
      .map((x) => parseInt(x));
    const op = split[j + 1].trim().split(" ")[4];
    let val: number | string = split[j + 1].trim().split(" ")[5];
    val = val === "old" ? "" : parseInt(val);
    const test = parseInt(split[j + 2].trim().split(" ").pop() ?? "");
    const toTrue = parseInt(split[j + 3].trim().split(" ").pop() ?? "");
    const toFalse = parseInt(split[j + 4].trim().split(" ").pop() ?? "");
    input.push(new Monkey(worry, op, val, test, toTrue, toFalse));
  }
  return input;
}

export function partOne(i: Input): number {
  const inspectAmount: number[] = [];
  for (let j = 0; j < i.length; j++) inspectAmount.push(0);
  for (let round = 0; round < 20; round++) {
    i.forEach((monkey, monkeyIdx) => {
      const len = monkey.worry.length;
      inspectAmount[monkeyIdx] += len;
      for (let idx = 0; idx < len; idx++) {
        const worry = monkey.operationPart1();
        const to = monkey.testAndSend();
        i[to].worry.push(worry);
      }
    });
  }
  const sorted = inspectAmount.sort((a, b) => b - a);
  return sorted[0] * sorted[1];
}

export function partTwo(i: Input): number {
  let base = 1;
  i.forEach((m) => (base *= m.test));
  const inspectAmount: number[] = [];
  for (let j = 0; j < i.length; j++) inspectAmount.push(0);
  for (let round = 0; round < 10000; round++) {
    i.forEach((monkey, monkeyIdx) => {
      const len = monkey.worry.length;
      inspectAmount[monkeyIdx] += len;
      for (let idx = 0; idx < len; idx++) {
        const worry = monkey.operationPart2();
        const to = monkey.testAndSend();
        i[to].worry.push(worry % base);
      }
    });
  }
  const sorted = inspectAmount.sort((a, b) => b - a);
  return sorted[0] * sorted[1];
}
