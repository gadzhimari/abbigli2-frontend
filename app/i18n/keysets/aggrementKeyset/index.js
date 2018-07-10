/* eslint-disable */
if (process.env.LOCATION === 'ru') {
  module.exports = require('./ru');
} else {
  module.exports = require('./en');
}
