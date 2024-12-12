/**
 * guard direction
 * the map of obstacles
 * route of path
 */

const {
  last,
  evolve,
  add,
  ifElse,
  gte,
  both,
  __,
  lt,
  inc,
  always,
  over,
  lensProp,
  pipe,
  append,
  split,
  splitEvery,
  map,
  trim,
  findIndex,
  equals,
  length,
  uniq,
  init,
  prop,
} = require('ramda');
const { positivePath } = require('./utils');

const performWalk = (isFinished, getNextState, initialState) => {
  const walk = (state) => {
    if (isFinished(state)) return state;
    return walk(getNextState(state));
  };

  return walk(initialState);
};

const hasGuardLeftGrid = (state) => {
  const [y, x] = last(state.path);
  return x < 0 || x >= state.gridWidth || y < 0 || y >= state.gridHeight;
};

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const circularIncrement = (min, max) =>
  ifElse(both(gte(__, min), lt(__, max)), inc, always(min));

const moveGuard = (state) => {
  const currentCoords = last(state.path);
  const [yDiff, xDiff] = state.directions[state.guardDirection];
  const nextCoords = evolve([add(yDiff), add(xDiff)], currentCoords);
  const objectAtLocation = positivePath(nextCoords, state.grid);
  if (objectAtLocation === '#')
    return over(lensProp('guardDirection'), circularIncrement(0, 3), state);
  return over(lensProp('path'), append(nextCoords), state);
};

const parseInput = pipe(trim, split('\n'), map(splitEvery(1)));

const findGuard = (grid) => {
  const checkRow = (y) => {
    const index = findIndex(equals('^'), grid[y]);
    if (index === -1) return checkRow(y + 1);
    return [y, index];
  };
  return checkRow(0);
};

function partOne(input) {
  const grid = parseInput(input);
  const guardLocation = findGuard(grid);
  const initialState = {
    grid,
    path: [guardLocation],
    gridHeight: length(grid),
    gridWidth: length(grid[0]),
    directions,
    guardDirection: 0,
  };

  const finalState = performWalk(hasGuardLeftGrid, moveGuard, initialState);

  return pipe(
    prop('path'),
    init, // Excludes the final location of the guard off the grid
    uniq,
    length,
  )(finalState);
}

function partTwo() {}

module.exports = { partOne, partTwo };
