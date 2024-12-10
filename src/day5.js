/**
 * Convert rules into map
 * For each number in the array, if you encounter a number on the left of a rule (X) then check to see if Y is present earlier in the array
 * Number X must not have any of Y before it.
 */

const {
  pipe,
  trim,
  split,
  reduceBy,
  map,
  head,
  append,
  reduce,
  intersection,
  length,
  not,
  reduced,
  propOr,
  filter,
  nth,
  sum,
  sort,
  includes,
  converge,
  pair,
  last,
} = require('ramda');

const isIntersection = pipe(intersection, length, Boolean);
const midpoint = (list) => nth(Math.floor(length(list) / 2), list);

const checkPrintList = (rulesMap) => (previousPages, nextPage) => {
  const pagesThatShouldNotBeBefore = propOr([], nextPage, rulesMap);
  if (isIntersection(previousPages, pagesThatShouldNotBeBefore))
    return reduced(false);
  return append(nextPage, previousPages);
};

const parseInput = pipe(
  trim,
  split('\n\n'),
  converge(pair, [
    pipe(
      head,
      split('\n'),
      map(split('|')),
      reduceBy((accumulator, [, y]) => append(y, accumulator), [], head),
    ),
    pipe(last, split('\n'), map(split(','))),
  ]),
);

function partOne(input) {
  const [rulesMap, printList] = parseInput(input);

  return pipe(
    filter(reduce(checkPrintList(rulesMap), [])),
    map(midpoint),
    sum,
  )(printList);
}

const xShouldBeBeforeY = (rulesMap, x, y) =>
  includes(y, propOr([], x, rulesMap));

const sorter = (rulesMap) => (a, b) => {
  if (xShouldBeBeforeY(rulesMap, a, b)) return -1;
  if (xShouldBeBeforeY(rulesMap, b, a)) return 1;
  return 0;
};

function partTwo(input) {
  const [rulesMap, printList] = parseInput(input);
  return pipe(
    filter(pipe(reduce(checkPrintList(rulesMap), []), not)),
    map(sort(sorter(rulesMap))),
    map(midpoint),
    sum,
  )(printList);
}

module.exports = { partOne, partTwo };
