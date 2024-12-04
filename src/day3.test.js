const { partOne, partTwo } = require('./day3');

const partOneTestData = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

test('Part One', () => {
  expect(partOne(partOneTestData)).toBe(161);
});

const partTwoTestData = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

test('Part Two', () => {
  expect(partTwo(partTwoTestData)).toBe(48);
});
