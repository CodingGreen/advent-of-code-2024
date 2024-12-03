const {
  pipe,
  trim,
  split,
  map,
  aperture,
  head,
  cond,
  always,
  F,
  gt,
  lt,
  and,
  curryN,
  T,
  apply,
  subtract,
  all,
  filter,
  length,
  either,
  remove,
  anyPass,
  times,
} = require('ramda');

const parseReports = pipe(
  trim,
  split('\n'),
  map(pipe(split(' '), map(Number))),
);

const within = curryN(3, (minBound, maxBound, value) =>
  and(gt(value, minBound), lt(value, maxBound)),
);

const isSafe = (report) => {
  const reportPairs = aperture(2, report);
  const firstPair = head(reportPairs);
  const difference = firstPair[0] - firstPair[1];
  const checkIsAscendingOrDescending = cond([
    [within(-4, 0), always(within(-4, 0))],
    [within(0, 4), always(within(0, 4))],
    [T, F],
  ]);
  const withinSafeLevel = checkIsAscendingOrDescending(difference);
  if (!withinSafeLevel) return false;
  return all(pipe(apply(subtract), withinSafeLevel))(reportPairs);
};

function partOne(input) {
  const reports = parseReports(input);
  return length(filter(isSafe, reports));
}

const tryRemoving = (report) => {
  const removalCombinations = pipe(
    length,
    times((index) => pipe(remove(index, 1), isSafe)),
    anyPass,
  )(report);
  return removalCombinations(report);
};

function partTwo(input) {
  const reports = parseReports(input);
  return length(filter(either(isSafe, tryRemoving), reports));
}

module.exports = { partOne, partTwo };
