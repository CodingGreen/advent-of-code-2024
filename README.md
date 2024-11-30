# Advent of Code Runner

This is template repository for completing advent of code in Javascript (specifically Node.js). Once setup it can automatically download puzzle input and run your solution to generate the answer. Puzzle input is then cached for offline use.

## Setup

To setup first clone this repository and run `npm install`. The puzzle input is personal to each user and therefore you will require your session token so that the tool can make the request. You can get your session token by following [this quick guide](https://github.com/wimglenn/advent-of-code-wim/issues/1). Next, duplicate the `.env.example` file and rename it `.env` and then enter your session token & also the current year you are participating in.

> Remember to not commit your session token or share it with anyone. Although this is probably not a big deal for advent of code it is still an important point generally.

## Writing your solutions

All of the source files are already created for each day. There is two functions, one for each part, which is passed the raw input data as downloaded. Simply fill in each solution in the relevant "part" function. You can of course define extra functions and constants in the file or import them from elsewhere. In fact this is actively encouraged as the two parts usually overlap so lets get abstracting and keep it DRY people!

## Testing your solutions

All the days have an example input - perfect for some Test Driven Development! Each day has a blank test file for you to fill in the input and expected output for the example. Run the tests with the command `npm test` or on a watcher using `npm run watch`.

## Run your solution with the puzzle input

Once you have completed a part of the day's solution simply run `npm start <day>`. This will download the given day's input and then execute your solution.

## Linting

I love eslint so I have added a basic config based on the airbnb base. Use `npm run lint` if you like, edit it to your preference, completely ignore it or delete it - up to you!

## Issues or feedback

I knocked this together pretty quickly but if you have issues or feedback I might be able to help. Just leave an issue on this repository!