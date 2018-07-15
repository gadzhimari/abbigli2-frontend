/* eslint-disable */
if (process.env.LOCATION === 'ru') {
  module.exports = require('./ru_RU');
} else {
  module.exports = require('./en_US');
}
