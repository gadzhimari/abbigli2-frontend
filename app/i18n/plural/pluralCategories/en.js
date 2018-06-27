/**
 * Возвращает правило для множественного перевода для русской локации
 * http://www.unicode.org/cldr/charts/33/supplemental/language_plural_rules.html#en
 *
 * @param {Number} v
 *
 * @returns {String}
 */
const getEnglishPluralCategory = (v) => {
  if (v === 1) return 'one';

  return 'other';
};

export default getEnglishPluralCategory;
