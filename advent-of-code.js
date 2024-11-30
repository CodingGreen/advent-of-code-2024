const axios = require('axios');
require('dotenv').config({ path: `${__dirname}/.env` });
const {
  promises: fs,
  constants: { R_OK: readCheckFlag },
} = require('fs');
const sourceCode = require('./src');

const session = process.env.ADVENT_OF_CODE_SESSION;
const year = process.env.YEAR;
const validInputCheck = /^\d+$/;

const cachePath = `${__dirname}/.cache/${year}`;

function isValidDayChoice(input) {
  if (
    input
    && input.length < 3
    && validInputCheck.test(input)
    && Number(input) > 0
    && Number(input) < 25
  ) return true;
  console.log('Please enter a whole number between 1 and 24');
  return false;
}

function isDayCached(dayCachePath) {
  return fs.access(
    dayCachePath,
    readCheckFlag,
  ).then(() => true).catch(() => false);
}

async function getInputData(day) {
  const dayCachePath = `${cachePath}/day${day}-input.txt`;

  if (await isDayCached(dayCachePath)) {
    return fs.readFile(dayCachePath, 'utf8');
  }

  console.log('Fetching input data online...');

  const inputUrl = `https://adventofcode.com/${year}/day/${day}/input`;
  const result = await axios.get(inputUrl, {
    headers: {
      Cookie: `session=${session}`,
    },
  });
  const inputData = result.data;

  await fs.mkdir(cachePath, { recursive: true });
  await fs.writeFile(dayCachePath, inputData);

  console.log('Input data cached for offline use.');

  return inputData;
}

async function run() {
  const dayChoice = process.argv[2];

  if (isValidDayChoice(dayChoice)) {
    const inputData = await getInputData(dayChoice);

    const { partOne, partTwo } = sourceCode[dayChoice];
    console.log('Part one result is:', partOne(inputData));
    console.log('Part two result is:', partTwo(inputData));
  }
}

run();
