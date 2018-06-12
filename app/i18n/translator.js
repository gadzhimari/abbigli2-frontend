/* eslint-disable no-underscore-dangle */
import forIn from 'lodash/forIn';
import isObject from 'lodash/isObject';

import en from './en_US';
import ru from './ru_RU';

const location = process.env.LOCATION;
const langs = { en, ru };

export const __t = (key, params) => {
  let result = langs[location][key] || key;

  if (isObject(params)) {
    forIn(params, (value, key) => {
      result = result.replace(`{{${key}}}`, value);
    });
  }

  return result;
};
