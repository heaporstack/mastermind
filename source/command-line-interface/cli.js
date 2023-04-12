import {createInterface} from "node:readline";
import {stdin, stdout} from "node:process";

async function readline(prompt) {
  const rl = createInterface({
    input: stdin,
    output: stdout
  });
  return new Promise((resolve, reject) => {
    rl.question(prompt, (answer) => {
      if (answer === undefined) {
        answer = "";
      }
      rl.close();
      resolve(answer);
    });
  });
}

export async function getUserColors({colorsKeys, length}) {
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

  let colorsListString = "";
  colorsKeys.forEach((element, index) => {
    if (index === 0) {
      colorsListString = `${element.key} (${element.name})`;
    } else {
      colorsListString = `${colorsListString}, ${element.key} (${element.name})`;
    }
  });
  let arr = [];
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
