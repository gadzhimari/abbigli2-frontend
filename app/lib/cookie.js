/* eslint global-require: 0 import/prefer-default-export: 0 */

let cookie = null;

if (typeof document !== 'undefined') {
  cookie = require('cookies-js');
}

export const getCookie = (value) => {
  if (!cookie) {
    return null;
  }

  return cookie.get(value);
};
