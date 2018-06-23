/**
 * Возвращает правило для множественного перевода для русской локации
 * http://www.unicode.org/cldr/charts/33/supplemental/language_plural_rules.html#ru
 *
 * @param {Number} v
 *
 * @returns {String}
 */
const getRussianPluralCategory = (v) => {
  const restOfTen = v % 10;
  const restOfHundred = v % 100;

  const isOne = restOfTen === 1 && restOfHundred !== 11;
  const isFew = (restOfTen >= 2 && restOfTen <= 4 &&
    (restOfHundred < 12 || restOfHundred > 14));

  // const isMany = restOfTen === 0 || (restOfTen >= 5 && restOfTen <= 9) ||
  //   (restOfHundred >= 11 && restOfHundred <= 14);

  if (isOne) {
    return 'one';
  }

  if (isFew) {
    return 'few';
  }

  return 'many';
};

export default getRussianPluralCategory;
