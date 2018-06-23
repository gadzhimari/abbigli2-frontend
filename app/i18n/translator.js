/* eslint-disable no-underscore-dangle */
import forIn from 'lodash/forIn';
import isObject from 'lodash/isObject';

import en from './en_US';
import ru from './ru_RU';

const location = process.env.LOCATION;
const langs = { en, ru };

export const __t = (key, params) => {
  let result = langs[location][key] || key;

  // if (isObject(result)) {
  //   result = plural(result, params);
  // }

  if (isObject(params)) {
    forIn(params, (value, key) => {
      result = result.replace(`{{${key}}}`, value);
    });
  }

  return result;
};

// const plural = (translate, params = {}) => {
//   let text = translate.text;

//   forIn(params, (value, key) => {
//     const pluralForParam = translate[key];

//     if (pluralForParam) {
//       text = text.replace(`{{${key}}}`, value);
//     } else {
//       const pluralCategory = getPluralCategory(value);
//     }
//   });

//   return text;
// };

// const getPluralCategory = (v) => {
//   const restOfTen = v % 10;
//   const restOfHundred = v % 100;

//   const isOne = restOfTen === 1 && restOfHundred !== 11;
//   const isFew = restOfTen === 0 || (restOfTen >= 2 && restOfTen <= 4 &&
//     restOfHundred < 12 && restOfHundred > 14);
//   const isMany = restOfTen === 0 || (restOfTen >= 5 && restOfTen <= 9) ||
//     (restOfTen >= 11 && restOfTen <= 14);

//   if (isOne) {
//     return 'one';
//   }

//   if (isFew) {
//     return 'few';
//   }

//   if (isMany) {
//     return 'many';
//   }
// };
