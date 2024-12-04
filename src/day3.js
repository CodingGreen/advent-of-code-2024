const { sum, map, curry, pipe, reduce, startsWith, prop } = require('ramda');

const matchAll = curry((regex, str) => [...str.matchAll(regex)]);
const instructionsMatcher = /mul\((\d+),(\d+)\)/g;

function partOne(input) {
  return pipe(
    matchAll(instructionsMatcher),
    map(([_, a, b]) => a * b),
    sum,
  )(input);
}

const additionalInstructionsMatcher = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;

function partTwo(input) {
  return pipe(
    matchAll(additionalInstructionsMatcher),
    reduce(
      (accumulator, instruction) => {
        const [command] = instruction;
        if (startsWith("don't", command))
          return { ...accumulator, enabled: false };
        if (startsWith('do', command)) return { ...accumulator, enabled: true };
        if (accumulator.enabled)
          return {
            ...accumulator,
            enabledInstructions: [
              ...accumulator.enabledInstructions,
              instruction,
            ],
          };
        return accumulator;
      },
      { enabled: true, enabledInstructions: [] },
    ),
    prop('enabledInstructions'),
    map(([_, a, b]) => a * b),
    sum,
  )(input);
}

module.exports = { partOne, partTwo };
