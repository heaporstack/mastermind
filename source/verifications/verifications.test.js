import {countCorrectPositions, countIncorrectPositions} from "./verifications.js";

console.assert(countIncorrectPositions(["a", "b", "c"], ["b", "a"]) === -1);
console.assert(countIncorrectPositions(["a", "b", "c"], ["b", "a", "c"]) === 2);
console.assert(countIncorrectPositions(["a", "b", "c"], ["b", "c", "a"]) === 3);
console.assert(countIncorrectPositions(["c", "c", "c"], ["a", "b", "c"]) === 0);
console.assert(countIncorrectPositions(["c", "c", "a", "a"], ["a", "b", "c", "c"]) === 3);
console.assert(countIncorrectPositions(["a", "b", "c", "c"], ["c", "c", "a", "a"]) === 3);
console.assert(countIncorrectPositions(["a", "a", "a", "a"], ["a", "a", "a", "a"]) === 0);
console.assert(countIncorrectPositions(["w", "o", "y", "w"], ["o", "w", "w", "y"]) === 4);
console.assert(countIncorrectPositions(["r", "r", "y", "g"], ["r", "g", "g", "g"]) === 0);
console.assert(countIncorrectPositions(["o", "o", "y", "w"], ["o", "w", "o", "r"]) === 2);
console.assert(countIncorrectPositions(["o", "o", "y", "w"], ["o", "w", "o", "r"]) === 2);
console.assert(countIncorrectPositions([0, undefined, null], [null, undefined, 0]) === 2);


console.assert(countCorrectPositions([undefined, null, null], [null, undefined]) === -1);
console.assert(countCorrectPositions([undefined, null, null], [null, undefined, null]) === 1);
console.assert(countCorrectPositions([0, undefined, null], [null, undefined, 0]) === 1);
console.assert(countCorrectPositions([NaN, NaN, NaN], [NaN, NaN, NaN]) === 0); // specific rule of NaN
console.assert(countCorrectPositions(["yellow", Infinity, 0], ["yellow", Infinity, 0]) === 3);
