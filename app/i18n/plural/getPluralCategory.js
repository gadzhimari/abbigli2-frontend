import en from './pluralCategories/en';
import ru from './pluralCategories/ru';

const location = process.env.LOCATION;
const pluralCategories = { en, ru };

/**
 * Возвращает правило для множественного перевода в зависимости от локали согласно доке:
 * ru: http://www.unicode.org/cldr/charts/33/supplemental/language_plural_rules.html#ru
 * en: http://www.unicode.org/cldr/charts/33/supplemental/language_plural_rules.html#en
 *
 * @param {Number} number
 *
 * @returns {String}
 */
const getPluralCategory = number => pluralCategories[location](number);

export default getPluralCategory;
