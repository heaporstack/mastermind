import {getColors, setKeys, generateSecretCode} from "./colors/colors.js";
import {getUserColors} from "./command-line-interface/cli.js";
import { countCorrectPositions, countIncorrectPositions } from "./verifications/verifications.js";

async function mastermindCli() {
  const colors = getColors();
  const colorsKeys = setKeys(colors);
  const length = 4;
  const secretCode = generateSecretCode({colorsKeys, length});
  console.log(secretCode);
  let userGuess = new Array(length);
  let attempts = 0;
  while (countCorrectPositions(userGuess, secretCode) !== length) {
    userGuess = await getUserColors({colorsKeys, length});
    console.log(`\x1b[32mMastermind\x1b[0m Corrects : ${countCorrectPositions(userGuess, secretCode)}, Wrong position : ${countIncorrectPositions(userGuess, secretCode)}`);
    ++attempts;
  }
  console.log(`You guessed after ${attempts} attempts`);
}

mastermindCli();
