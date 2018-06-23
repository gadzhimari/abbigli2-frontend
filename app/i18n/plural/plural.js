import forIn from 'lodash/forIn';

import getPluralCategory from './getPluralCategory';

// TODO: написать тесты
/**
 * Используется для перевода слов в множественной форме
 *
 * @param {Object} translate - значение ключа для перевода
 * @param {Object} params - параметры для подстановки значение
 *
 * @returns {String}
 */
const plural = (translate, params = {}) => {
  let text = translate.text;

  forIn(params, (value, key) => {
    const pluralForParam = translate[key];
    let textForReplace = value;

    if (pluralForParam) {
      const pluralCategory = getPluralCategory(value);
      textForReplace = pluralForParam[pluralCategory].replace('{{#}}', value);
    }

    text = text.replace(`{{${key}}}`, textForReplace);
  });

  return text;
};

export default plural;
