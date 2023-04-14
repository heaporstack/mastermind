import {readFileSync} from "node:fs";

export interface Color {
  name: string
  value: number
  key: string
}

export function getColors() {
  let colors = [];
  try {
    colors = JSON.parse(readFileSync("./source/colors.json").toString());
  } catch (error) {}
  return colors;
}

export function setKeys(colors: Array<Color>) {
  const chars = new Array<string>();
  const colorsAndKeys = new Array<Color>();
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

export function generateSecretCode(colorsKeys: Array<Color>, length: number) {
  const arr = new Array<string>();
  for (let i = 0; i < length; ++i) {
    const index = Math.floor(Math.random() * colorsKeys.length);
    arr.push(colorsKeys[index].key);
  }
  return arr;
}
