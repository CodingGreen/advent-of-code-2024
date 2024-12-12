const { ifElse, all, gte, __, path, always } = require('ramda');

const positivePath = ifElse(all(gte(__, 0)), path, always(always(undefined)));

module.exports = { positivePath };
