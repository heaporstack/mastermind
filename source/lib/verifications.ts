export function countIncorrectPositions<T>(src: Array<T>, arr: Array<T>): number {
  if (src.length !== arr.length) {
    return -1;
  }
  const srcNil = Object.create(null); // unique object
  const arrNil = Object.create(null);
  let ret = 0;
  const srcCpy = JSON.parse(JSON.stringify(src));
  const arrCpy = JSON.parse(JSON.stringify(arr));

  for (let i = 0; i < srcCpy.length; ++i) {
    if (srcCpy[i] === arrCpy[i]) {
      srcCpy[i] = srcNil;
      arrCpy[i] = arrNil;
    }
  }
  for (let i = 0; i < srcCpy.length; ++i) {
    if (srcCpy.includes(arrCpy[i])) {
      srcCpy[srcCpy.indexOf(arrCpy[i])] = srcNil;
      ++ret;
    }
  }
  return ret;
}

export function countCorrectPositions<T>(src: Array<T>, arr: Array<T>): number {
  if (src.length !== arr.length) {
    return -1;
  }
  let ret = 0;
  for (let i = 0; i < src.length; ++i) {
    if (src[i] === arr[i]) {
      ++ret;
    }
  }
  return ret;
}
