/* eslint global-require: 0 import/prefer-default-export: 0 */

let cookie = null;

if (typeof document !== 'undefined') {
  cookie = require('cookies-js');

  cookie.defaults = {
    path: '/'
  };
}

export const setCookie = (key, value, options) => {
  if (cookie) {
    cookie.set(key, value, options);
  }
};

export const getCookie = (key) => {
  if (!cookie) {
    return null;
  }

  return cookie.get(key);
};

export const deleteCookie = (key) => {
  if (cookie) {
    cookie.expire(key);
  }
};
