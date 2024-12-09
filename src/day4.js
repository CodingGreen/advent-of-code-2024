const {
  pipe,
  trim,
  splitEvery,
  split,
  map,
  transpose,
  path,
  add,
  __,
  allPass,
  evolve,
  identity,
  equals,
  applyTo,
  addIndex,
  count,
  sum,
  all,
  gte,
  ifElse,
  always,
} = require('ramda');

const parseWordSearch = pipe(trim, split('\n'), map(splitEvery(1)), transpose);

const positivePath = ifElse(all(gte(__, 0)), path, always(always(undefined)));

const checkDirection =
  (directionConfig) =>
  ({ currentCoords, wordSearch }) =>
    allPass(
      map(
        ([[xDiff, yDiff], letter]) =>
          pipe(
            positivePath(evolve([add(xDiff), add(yDiff)], currentCoords)),
            equals(letter),
          ),
        directionConfig,
      ),
    )(wordSearch);

const checkNorth = checkDirection([
  [[0, 1], 'M'],
  [[0, 2], 'A'],
  [[0, 3], 'S'],
]);

const checkNorthEast = checkDirection([
  [[1, 1], 'M'],
  [[2, 2], 'A'],
  [[3, 3], 'S'],
]);

const checkEast = checkDirection([
  [[1, 0], 'M'],
  [[2, 0], 'A'],
  [[3, 0], 'S'],
]);

const checkSouthEast = checkDirection([
  [[1, -1], 'M'],
  [[2, -2], 'A'],
  [[3, -3], 'S'],
]);

const checkSouth = checkDirection([
  [[0, -1], 'M'],
  [[0, -2], 'A'],
  [[0, -3], 'S'],
]);

const checkSouthWest = checkDirection([
  [[-1, -1], 'M'],
  [[-2, -2], 'A'],
  [[-3, -3], 'S'],
]);

const checkWest = checkDirection([
  [[-1, 0], 'M'],
  [[-2, 0], 'A'],
  [[-3, 0], 'S'],
]);

const checkNorthWest = checkDirection([
  [[-1, 1], 'M'],
  [[-2, 2], 'A'],
  [[-3, 3], 'S'],
]);

const xmasChecks = [
  checkNorth,
  checkNorthEast,
  checkEast,
  checkSouthEast,
  checkSouth,
  checkSouthWest,
  checkWest,
  checkNorthWest,
];

const masCrossChecks = [
  checkDirection([
    [[-1, -1], 'M'],
    [[1, 1], 'S'],
    [[-1, 1], 'M'],
    [[1, -1], 'S'],
  ]),
  checkDirection([
    [[-1, -1], 'S'],
    [[1, 1], 'M'],
    [[-1, 1], 'S'],
    [[1, -1], 'M'],
  ]),
  checkDirection([
    [[-1, -1], 'S'],
    [[1, 1], 'M'],
    [[-1, 1], 'M'],
    [[1, -1], 'S'],
  ]),
  checkDirection([
    [[-1, -1], 'M'],
    [[1, 1], 'S'],
    [[-1, 1], 'S'],
    [[1, -1], 'M'],
  ]),
];

const checkLocation = (checks, x, y, wordSearch) =>
  pipe(
    map(applyTo({ currentCoords: [x, y], wordSearch })),
    count(identity),
  )(checks);

const mapIndexed = addIndex(map);

const countWords = (targetLetter, checks) => (wordSearch) =>
  mapIndexed(
    (column, x) =>
      mapIndexed((letter, y) => {
        if (equals(targetLetter, letter)) {
          return checkLocation(checks, x, y, wordSearch);
        }
        return 0;
      }, column),

    wordSearch,
  );

function partOne(input) {
  return pipe(
    parseWordSearch,
    countWords('X', xmasChecks),
    map(sum),
    sum,
  )(input);
}

function partTwo(input) {
  return pipe(
    parseWordSearch,
    countWords('A', masCrossChecks),
    map(sum),
    sum,
  )(input);
}

module.exports = { partOne, partTwo };
