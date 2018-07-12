/**
 * @typedef {Object} Mask

 * @param {RegExp|String|Function} mask
 * @param {Formatter} [formatter]

 * @typedef {Formatter}

 * @param {String} value

 * @returns {String} rawValue
 */

const mask = {
  mask: ['+', /\d/, ' ', /[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
  formatter: value => value.replace(/(?!^\+)[^\d\n]/g, ''),
};

export default mask;
