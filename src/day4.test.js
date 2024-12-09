const { partOne, partTwo } = require('./day4');

const testData = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

test('Part One', () => {
  expect(partOne(testData)).toBe(18);
});

test('Part Two', () => {
  expect(partTwo(testData)).toBe(9);
});
