/* eslint-disable no-underscore-dangle */
import forIn from 'lodash/forIn';
import isObject from 'lodash/isObject';

import locale from './locale';

import plural from './plural/plural';

export const __t = (key, params) => {
  let result = locale[key] || key;

  if (isObject(result)) {
    return plural(result, params);
  }

  if (isObject(params)) {
    forIn(params, (value, key) => {
      result = result.replace(`{{${key}}}`, value);
    });
  }

  return result;
};
