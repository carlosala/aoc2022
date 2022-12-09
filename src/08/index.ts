export type Input = number[][];

export function prepareInput(i: string): Input {
  return i
    .trim()
    .split("\n")
    .map((line) => line.split("").map((x) => Number(x)));
}

export function partOne(i: Input): number {
  let result = (i.length + i[0].length - 2) * 2; // edge trees
  for (let j = 1; j < i.length - 1; j++) {
    for (let k = 1; k < i[0].length - 1; k++) {
      let visible = 1;
      for (let l = j - 1; l >= 0; l--)
        if (i[l][k] >= i[j][k]) {
          visible = 0;
          break;
        }
      if (visible === 0) {
        visible = 1;
        for (let l = j + 1; l < i.length; l++)
          if (i[l][k] >= i[j][k]) {
            visible = 0;
            break;
          }
      }
      if (visible === 0) {
        visible = 1;
        for (let l = k - 1; l >= 0; l--)
          if (i[j][l] >= i[j][k]) {
            visible = 0;
            break;
          }
      }
      if (visible === 0) {
        visible = 1;
        for (let l = k + 1; l < i[0].length; l++)
          if (i[j][l] >= i[j][k]) {
            visible = 0;
            break;
          }
      }
      result += visible;
    }
  }
  return result;
}

export function partTwo(i: Input): number {
  let ideal = 0;
  for (let j = 1; j < i.length - 1; j++) {
    for (let k = 1; k < i[0].length - 1; k++) {
      let vision = 1;
      let sideVision = 0;
      for (let l = j - 1; l >= 0; l--) {
        sideVision++;
        if (i[l][k] >= i[j][k]) break;
      }
      vision *= sideVision;
      sideVision = 0;
      for (let l = j + 1; l < i.length; l++) {
        sideVision++;
        if (i[l][k] >= i[j][k]) break;
      }
      vision *= sideVision;
      sideVision = 0;
      for (let l = k - 1; l >= 0; l--) {
        sideVision++;
        if (i[j][l] >= i[j][k]) break;
      }
      vision *= sideVision;
      sideVision = 0;
      for (let l = k + 1; l < i[0].length; l++) {
        sideVision++;
        if (i[j][l] >= i[j][k]) break;
      }
      vision *= sideVision;
      if (vision > ideal) ideal = vision;
    }
  }
  return ideal;
}
