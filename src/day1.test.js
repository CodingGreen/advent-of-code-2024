const { partOne, partTwo } = require('./day1');

const testData = `
3   4
4   3
2   5
1   3
3   9
3   3
`;

test('Part One', () => {
  expect(partOne(testData)).toBe(11);
});

test('Part Two', () => {
  expect(partTwo(testData)).toBe(31);
});
