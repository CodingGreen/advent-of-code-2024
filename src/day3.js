const { sum, map } = require('ramda');

function partOne(input) {
  return sum(
    map(([_, a, b]) => a * b, [...input.matchAll(/mul\((\d+),(\d+)\)/g)]),
  );
}

function partTwo(input) {}

module.exports = { partOne, partTwo };
