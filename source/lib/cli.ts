import {createInterface} from "node:readline";
import {stdin, stdout} from "node:process";
import {Color} from "./color";

async function readline(prompt: string): Promise<string> {
  const rl = createInterface({
    input: stdin,
    output: stdout
  });
  return new Promise((resolve, reject) => {
    rl.question(prompt, (answer: string) => {
      rl.close();
      resolve(answer);
    });
  });
}

export async function getUserColors(colorsKeys: Array<Color>, length: number) {
  let colorsListString = "";
  colorsKeys.forEach((element, index) => {
    if (index === 0) {
      colorsListString = `${element.key} (${element.name})`;
    } else {
      colorsListString = `${colorsListString}, ${element.key} (${element.name})`;
    }
  });
  let arr = new Array<string>();
  while (true) {
    let input = await readline(`\x1b[32mMastermind\x1b[0m Enter a combination of valid colors (length must be ${length}), choose between [${colorsListString}] :\n`);
    arr = input.split("");
    if (arr.length !== length) {
      console.error("\x1b[31mError\x1b[0m Your input does not match expected length");
      continue;
    }

    let keyExists = 0;
    arr.forEach((char) => {
      colorsKeys.forEach((colorKey) => {
        if (char === colorKey.key) {
          ++keyExists;
        }
      });
    });
    if (keyExists !== length) {
      console.error("\x1b[31mError\x1b[0m At least one of the character you typed designates no color");
      continue;
    }
    break;
  }
  return arr;
}
