const { partOne, partTwo } = require('./day3');

const testData = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

test('Part One', () => {
  expect(partOne(testData)).toBe(161);
});

test('Part Two', () => {
  expect(partTwo(testData)).toBe();
});
