import {readFileSync} from "node:fs";

export function getColors() {
  let colors = [];
  try {
    colors = JSON.parse(readFileSync("./source/colors.json").toString());
  } catch (error) {}
  return colors;
}

export function setKeys(colors) {
  const chars = [];
  const colorsAndKeys = [];
  for (const color of colors) {
    const char = color.name.charAt(0).toLowerCase();
    if (chars.includes(char)) {
      throw Error("Colors name first character must be different");
    }
    chars.push(char);
    colorsAndKeys.push({...color, key: char});
  }
  return colorsAndKeys;
}

export function generateSecretCode({colorsKeys, length}) {
  // security
  if (!(colorsKeys instanceof Array)) {
    throw TypeError("colorsKeys must be an array");
  }
  if (typeof length !== "number") {
    throw TypeError("length must be a number");
  }
  let error = false;
  for (const element of colorsKeys) {
    if (!("key" in element)) {
      error = true;
      break;
    }
    if (!("name" in element)) {
      error = true;
      break;
    }
  }
  if (error) {
    throw TypeError("colorsKeys must contain objects with keys \"key\" and \"name\"");
  }

  const arr = [];
  for (let i = 0; i < length; ++i) {
    const index = Number.parseInt(Math.random() * colorsKeys.length, 10);
    arr.push(colorsKeys[index].key);
  }
  return arr;
}
