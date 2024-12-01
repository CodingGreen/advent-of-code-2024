const {
  pipe,
  split,
  trim,
  map,
  transpose,
  sortBy,
  identity,
  zipWith,
  apply,
  subtract,
  filter,
  converge,
  nth,
  multiply,
  useWith,
  countBy,
  props,
  defaultTo,
  prop,
  sum,
} = require('ramda');

const parseLists = pipe(
  trim,
  split('\n'),
  map(pipe(split(' '), filter(identity), map(Number))),
  transpose,
);

const absoluteDifference = pipe(subtract, Math.abs);

function partOne(input) {
  return pipe(
    parseLists,
    map(sortBy(identity)),
    apply(zipWith(absoluteDifference)),
    sum,
  )(input);
}

const convertListToOccurrenceCount = pipe(props, map(defaultTo(0)));

function partTwoPointFree(input) {
  return pipe(
    parseLists,
    converge(zipWith(multiply), [
      nth(0),
      apply(
        useWith(convertListToOccurrenceCount, [identity, countBy(identity)]),
      ),
    ]),
    sum,
  )(input);
}

const getCount = pipe(prop, defaultTo(0));

function partTwo(input) {
  const [list1, list2] = parseLists(input);
  const list2Counts = countBy(identity, list2);
  return pipe(
    map((a) => a * getCount(a, list2Counts)),
    sum,
  )(list1);
}

module.exports = { partOne, partTwo };
